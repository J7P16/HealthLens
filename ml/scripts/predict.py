#!/usr/bin/env python

import os
import json
import argparse
from datetime import datetime
import uuid

import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import efficientnet_b3
from PIL import Image
import firebase_admin
from firebase_admin import credentials, storage

USE_FIREBASE = True

PREDICTIONS_DIR = os.path.abspath("/Users/krishgandhi/HealthLens/backend/predictions")
os.makedirs(PREDICTIONS_DIR, exist_ok=True)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

CLASS_NAMES = [
    "Actinic Keratosis",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanoma",
    "Melanocytic Nevi",
    "Squamous Cell Carcinoma",
    "Vascular Lesion",
]

parser = argparse.ArgumentParser()
parser.add_argument("--model_path", type=str, required=True)
parser.add_argument("--input", type=str, required=True)
args = parser.parse_args()

if USE_FIREBASE:
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {
            "storageBucket": "healthlens-942ea.firebasestorage.app"
        })
    bucket = storage.bucket()

    def download_image(blob_path, local_path):
        blob = bucket.blob(blob_path)
        blob.download_to_filename(local_path)

    def upload_file(local_file, remote_path):
        blob = bucket.blob(remote_path)
        blob.upload_from_filename(local_file)


def build_model(num_classes):
    model = efficientnet_b3(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, num_classes)
    return model


model = build_model(len(CLASS_NAMES))
checkpoint = torch.load(args.model_path, map_location=DEVICE)

if isinstance(checkpoint, dict) and "model_state_dict" in checkpoint:
    model.load_state_dict(checkpoint["model_state_dict"])
else:
    model.load_state_dict(checkpoint)

model.to(DEVICE)
model.eval()


preprocess = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])


def get_local_image(input_path):
    if input_path.startswith("firebase://"):
        firebase_path = input_path.replace("firebase://", "")
        local_path = os.path.join(PREDICTIONS_DIR, f"{uuid.uuid4()}.jpg")
        download_image(firebase_path, local_path)
        return local_path
    return input_path


def predict_image(image_path):
    img = Image.open(image_path).convert("RGB")

    tensor = preprocess(img).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        probs = torch.softmax(model(tensor), dim=1).squeeze().cpu().tolist()

    ranked = sorted(enumerate(probs), key=lambda x: x[1], reverse=True)

    top_k = [
        {
            "rank": i + 1,
            "class_index": idx,
            "class_name": CLASS_NAMES[idx],
            "confidence": round(prob, 6),
            "confidence_pct": f"{prob * 100:.2f}%"
        }
        for i, (idx, prob) in enumerate(ranked[:3])
    ]

    all_probs = {
        CLASS_NAMES[i]: round(p, 6) for i, p in enumerate(probs)
    }

    return top_k, all_probs


image_path = get_local_image(args.input)

top_k, all_probs = predict_image(image_path)

top1 = top_k[0]

firebase_path = args.input.replace("firebase://", "")
parts = firebase_path.split("/")
user_id = parts[1]
image_name = os.path.splitext(parts[-1])[0]

full_output = {
    "metadata": {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "model": os.path.abspath(args.model_path),
        "device": str(DEVICE),
    },
    "prediction": {
        "predicted_class": top1["class_name"],
        "confidence": top1["confidence"],
        "confidence_pct": top1["confidence_pct"],
        "top_k_predictions": top_k,
        "all_class_probabilities": all_probs,
    }
}


full_path = os.path.join(
    PREDICTIONS_DIR,
    user_id,
    image_name,
    "full.json"
)

os.makedirs(os.path.dirname(full_path), exist_ok=True)

with open(full_path, "w") as f:
    json.dump(full_output, f, indent=2)


if USE_FIREBASE:
    try:
        upload_file(
            full_path,
            f"predictions/{user_id}/{image_name}/full.json"
        )
    except Exception as e:
        print("Firebase upload failed:", e)

print(json.dumps(full_output))