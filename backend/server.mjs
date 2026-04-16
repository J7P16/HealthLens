import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import 'dotenv/config';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const openai = new OpenAI();

app.use(cors()); 
app.use(express.json()); 

// run python cnn script and read the output file of predict.py
function runCNNModel(imagePath) {
  return new Promise((resolve, reject) => {
    
    // specify the paths for the python script and the model
    const scriptPath = path.resolve('../ml/scripts/predict.py');
    const modelPath = path.resolve('../ml/models/best_model.pth'); 

    // run python: python3 predict.py --model_path [path] --input [imagePath]
    const pythonProcess = spawn('python3', [
      scriptPath,
      '--model_path', modelPath,
      '--input', imagePath
    ]);

    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Python Error]: ${data.toString()}`);
    });

    // execute when python script is succesfully run (code === 0)
    pythonProcess.on('close', async (code) => {
      if (code !== 0) {
        return reject(new Error(`Python script failed with code ${code}`));
      }

      try {
        // infer the filename based on how predict.py saves files
        const baseName = path.parse(imagePath).name;
        
        // Must change path name (refer to PREDICTIONS_DIR in predict.py)
        const predictionsDir = "/Users/parkseohyun/Desktop/Coding/HealthLens/ml/predictions"; 
        const fullJsonPath = path.join(predictionsDir, `${baseName}_full.json`);

        // read the json file and convert it into a javascript object
        const fileContent = await fs.readFile(fullJsonPath, 'utf-8');
        const result = JSON.parse(fileContent);

        // extract only the diagnosis name from the result
        const topPredictions = result.prediction.top_k_predictions;
        resolve(topPredictions);

      } catch (err) {
        reject(new Error("Failed to read JSON output from Python: " + err.message));
      }
    });
  });
}

// main api route
app.post('/api/diagnose', async (req, res) => {
  try {
    const imagePath = req.body.imagePath;
    if (!imagePath) throw new Error("Image path is required.");
    console.log(`\n[Server] Received request to diagnose image: ${imagePath}`);

    // run cnn model (get results from the json file)
    console.log("[Server] Running CNN Model (Python)...");
    const cnnDiagnosisList = await runCNNModel(imagePath);

    // pass the result to openai 
    console.log(`[Server] Python finished. Asking OpenAI about: ${cnnDiagnosisList}...`);
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a dermatology assistant. You will receive top 3 predictions with probabilities from a CNN model. You must respond in valid JSON format with exactly three keys: 'diagnosis' (state the most likely one), 'simple_explanation' (explain it simply, mentioning if other conditions are also possible based on probabilities), and 'recommended_action'."
        },
        {
          role: "user",
          content: `The CNN model output is: ${JSON.stringify(cnnDiagnosisList)}. Please provide details.`
        }
      ]
    });

    // send the final response to the frontend
    const finalJsonObject = JSON.parse(chatCompletion.choices[0].message.content);
    console.log("[Server] Success: Sending final JSON to frontend.");
    res.json(finalJsonObject);

  } catch (error) {
    console.error("[Server] Error:", error.message);
    res.status(500).json({ error: "Failed to generate diagnosis." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running and listening on http://localhost:${PORT}`);
});