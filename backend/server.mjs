import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";
import { spawn } from "child_process";
import path from "path";
import admin from "firebase-admin";
import fs from "fs/promises";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "healthlens-942ea.firebasestorage.app",
});

const bucket = admin.storage().bucket();
const app = express();
const openai = new OpenAI();

app.use(cors());
app.use(express.json());

/**
 * RUN PYTHON MODEL (NO FILE READING)
 */
function runCNNModel(firebasePath) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve("../ml/scripts/predict.py");
    const modelPath = path.resolve("../ml/models/best_model.pth");

    const python = spawn("python3", [
      scriptPath,
      "--model_path",
      modelPath,
      "--input",
      `firebase://${firebasePath}`,
    ]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error(error);
        return reject(new Error("Python failed"));
      }

      try {
        const json = JSON.parse(output);
        resolve(json.prediction.top_k_predictions);
      } catch (e) {
        reject(new Error("Invalid JSON from Python stdout"));
      }
    });
  });
}

/**
 * MAIN PIPELINE
 */
app.post("/api/diagnose", async (req, res) => {
  try {
    const { firebasePath } = req.body;

    if (!firebasePath) {
      return res.status(400).json({ error: "Missing firebasePath" });
    }

    console.log("\n[Backend] Received:", firebasePath);

    // 1. Run CNN
    const cnnResult = await runCNNModel(firebasePath);

    console.log("[Backend] CNN result:", cnnResult);

    // 2. OpenAI reasoning
    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a dermatology assistant. Return JSON with diagnosis, simple_explanation, recommended_action.",
        },
        {
          role: "user",
          content: `CNN output: ${JSON.stringify(cnnResult)}`,
        },
      ],
    });

    const aiResult = JSON.parse(chat.choices[0].message.content);

    console.log("[Backend] AI result ready");

    console.log("\n🧠 FINAL AI JSON OUTPUT:");
    console.log(JSON.stringify(aiResult, null, 2));

    // 3. CREATE FINAL JSON
    const finalResult = {
      cnn: cnnResult,
      ai: aiResult,
      timestamp: new Date().toISOString(),
    };

    // 4. FIX PATH HANDLING
    const fileName = path.basename(firebasePath, path.extname(firebasePath));

    // extract userId from "images/userId/file.jpg"
    const parts = firebasePath.split("/");
    const userId = parts[1];
    const imageFolder = fileName;

    const finalPath = `predictions/${userId}/${imageFolder}/${fileName}_final.json`;

    // 5. TEMP FILE (portable version)
    const tmpPath = path.join(process.cwd(), `${fileName}_final.json`);

    await fs.writeFile(tmpPath, JSON.stringify(finalResult, null, 2));

    // 6. Upload to Firebase Storage
    await bucket.upload(tmpPath, {
      destination: finalPath,
      metadata: {
        contentType: "application/json",
      },
    });

    console.log("[Backend] Uploaded final JSON to:", finalPath);

    // 7. Return response
    res.json({
      success: true,
      cnn: cnnResult,
      ai: aiResult,
      firebaseFinalPath: finalPath,
    });

  } catch (err) {
    console.error("[Backend Error]", err);
    res.status(500).json({ error: "Pipeline failed" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});