import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
from io import BytesIO
import base64
import pandas as pd
import joblib

device = "cpu"

num = {
    "ekb": 7,
    "nn": 8,
    "vlad": 7,
    "yar": 6,
}

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

test_transform = transforms.Compose(
    [
        transforms.Resize(256),
        transforms.ToTensor(),
        transforms.Normalize(mean, std),
    ]
)


model_ekb = joblib.load("app/models/img2label/weights/model_ekb.pkl")
model_nn = joblib.load("app/models/img2label/weights/model_nn.pkl")
model_vlad = joblib.load("app/models/img2label/weights/model_vlad.pkl")
model_yar = joblib.load("app/models/img2label/weights/model_yar.pkl")

idx2label_ekb = {
    0: "Другие места",
    1: "Туристические объекты",
    2: "Музеи и памятники",
    3: "Архитектурные объекты",
    4: "Религиозные места",
    5: "Спорт и развлечения",
    6: "Природные объекты",
}

idx2label_nn = {
    0: "Туристические объекты",
    1: "Архитектурные объекты",
    2: "Музеи и памятники",
    3: "Религиозные места",
    4: "Финансовые и банковские учреждения",
    5: "Рестораны и еда",
    6: "Спорт и развлечения",
    7: "Природные объекты",
}


idx2label_vladimir = {
    0: "Другие места",
    1: "Музеи и памятники",
    2: "Архитектурные объекты",
    3: "Туристические объекты",
    4: "Религиозные места",
    5: "Спорт и развлечения",
    6: "Природные объекты",
}

idx2label_yaroslavl = {
    0: "Другие места",
    1: "Музеи и памятники",
    2: "Архитектурные объекты",
    3: "Религиозные места",
    4: "Спорт и развлечения",
    5: "Природные объекты",
}

models = {
    "ekb": model_ekb,
    "nn": model_nn,
    "vlad": model_vlad,
    "yar": model_yar,
}

city_decode = {
    "ekb": idx2label_ekb,
    "nn": idx2label_nn,
    "vlad": idx2label_vladimir,
    "yar": idx2label_yaroslavl,
}


def get_lables(img, city):
    model = models[city]
    img = Image.open(BytesIO(base64.b64decode(img))).convert("RGB")
    img = test_transform(img).unsqueeze(0)
    ans = model(img)

    top_k = 3
    top_k_values, top_k_indices = torch.topk(torch.sigmoid(ans), top_k, dim=1)
    top_k_labels = [city_decode[city][idx.item()] for idx in top_k_indices[0]]

    results = [
        {"label": label, "score": str(float(score))}
        for label, score in zip(top_k_labels, list(top_k_values[0].detach().numpy()))
    ]

    return results
