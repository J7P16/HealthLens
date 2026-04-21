import torch
import pickle

model_path = "../models"

# load your .pth model
model = torch.load(model_path + "/best_model.pth")

# save as pickle
with open(model_path + "/model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Conversion complete: model.pkl created")
