import torch
import torch.nn as nn
import torchvision.transforms as transforms
from sklearn.preprocessing import LabelEncoder
import pandas as pd

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

num = {
    'ekb' : 54,
    'nn' : 49,
    'vald' : 59,
    'yar' : 56,
}
models = {
    'ekb' : 'weights/model_ekb.pkl',
    'nn' : 'weights/model_nn.pkl',
    'vald' : 'weights/model_vladimir.pkl',
    'yar' : 'weights/model_yaroslavl.pkl',
}

mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

test_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(256),
    transforms.ToTensor(),
    transforms.Normalize(mean, std)
])


class Model():
    def __init__(self, city) -> None:
        self.city = city
        num_classes = num[self.city]

        pretrained_model_ekb = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=False)
        pretrained_model_ekb.classifier = nn.Sequential(
            nn.Dropout(p=0.2, inplace=False),
            nn.Linear(in_features=pretrained_model_ekb.last_channel, out_features=num_classes, bias=True)
        )
        self.model = pretrained_model_ekb.load_state_dict(torch.load(models[self.city])).to(device)

    def get_pred(self, img):
        img = test_transform(img)
        return self.model(img)

