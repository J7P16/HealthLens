import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import 'dotenv/config';
import { spawn } from 'child_process';


const app = express();
const openai = new OpenAI();


app.use(cors());
app.use(express.json());

// Run Python CNN
function runCNNModel(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [
      'ml/scripts/predict.py',
      '--model_path', 'ml/models/best_model.pth',
      '--input', imagePath
    ]);

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject("Python script failed");
        return;
      }

      const path = require('path');
      const fs = require('fs');

      const baseName = path.basename(imagePath).split('.')[0];
      const jsonPath = path.join(
        __dirname,
        'predictions',
        `${baseName}_full.json`
      );

      try {
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        resolve(data.prediction.predicted_class);
      } catch (err) {
        reject("Failed to read prediction JSON");
      }
    });
  });
}

// API route
app.post('/api/diagnose', async (req, res) => {
  try {
    const firebasePath = req.body.firebasePath;

    if (!firebasePath) {
      return res.status(400).json({ error: "Missing firebasePath" });
    }

    const cnnDiagnosis = await runCNNModel(`firebase://${firebasePath}`);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a dermatology assistant. Respond ONLY in JSON with keys: diagnosis, simple_explanation, recommended_action."
        },
        {
          role: "user",
          content: `The CNN model diagnosed: ${cnnDiagnosis}`
        }
      ]
    });

    const jsonObject = JSON.parse(chatCompletion.choices[0].message.content);

    res.json(jsonObject);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate diagnosis." });
  }
});