import torch.nn.functional as F
import base64
import ruclip
import torch
from PIL import Image
from io import BytesIO
import numpy as np
import pandas as pd
import joblib
import os

os.environ["CURL_CA_BUNDLE"] = ""


model, processor = ruclip.load(
    "ruclip-vit-base-patch32-384", device="cpu", cache_dir="app/cache_ruclip"
)
templates = ["{}", "это {}", "на фото {}"]
predictor = ruclip.Predictor(model, processor, "cpu", bs=8, templates=templates)

text_latents_name_ekb = joblib.load(
    r"app\models\text2img\weights\ekb_text_latents_name.pkl"
)
image_latents_ekb = joblib.load(r"app\models\text2img\weights\ekb_image_latents.pkl")

text_latents_name_nn = joblib.load(
    r"app\models\text2img\weights\nn_text_latents_name.pkl"
)
image_latents_nn = joblib.load(r"app\models\text2img\weights\nn_image_latents.pkl")

text_latents_name_vlad = joblib.load(
    r"app\models\text2img\weights\vladimir_text_latents_name.pkl"
)
image_latents_vlad = joblib.load(
    r"app\models\text2img\weights\vladimir_image_latents.pkl"
)

text_latents_name_yar = joblib.load(
    r"app\models\text2img\weights\yaroslavl_text_latents_name.pkl"
)
image_latents_yar = joblib.load(
    r"app\models\text2img\weights\yaroslavl_image_latents.pkl"
)

df = pd.read_csv(r"app\models\text2img\weights\id_conc.csv")

city_model = {
    "Екатеринбург": [text_latents_name_ekb, image_latents_ekb],
    "Нижний Новгород": [text_latents_name_nn, image_latents_nn],
    "Владимир": [text_latents_name_vlad, image_latents_vlad],
    "Ярославль": [text_latents_name_yar, image_latents_yar],
}


def get_request_embedding(request):
    request = [request]
    with torch.no_grad():
        text_latents = predictor.get_text_latents(request)

    return F.normalize(text_latents, p=2, dim=-1)


def get_cosine_similarity(request_latents, other_latents):
    cosine_similarities = torch.matmul(request_latents, other_latents.T)

    cosine_similarities = cosine_similarities.flatten()

    return cosine_similarities


def normalize_scores(scores):
    """Normalize scores to a [0, 1] range."""
    min_score = scores.min()
    max_score = scores.max()
    return (scores - min_score) / (max_score - min_score)


def filter_unique_places(sorted_indices, df):
    mapped_name_ids = df.iloc[sorted_indices.cpu().numpy()]["global_id"]

    _, unique_indices = np.unique(mapped_name_ids, return_index=True)
    unique_indices_sorted = np.sort(
        unique_indices
    )  # Sort the indices to maintain the order

    final_indices = sorted_indices[unique_indices_sorted]

    return final_indices


def get_top_n_objects(df, indices_sorted, cosine_sim, top_n=5):
    top_indices = indices_sorted[:top_n].cpu().numpy()
    top_scores = cosine_sim[top_indices].cpu().numpy()

    top_data = [
        (df.loc[df.index == idx, "global_id"].values[0], score)
        for idx, score in zip(top_indices, top_scores)
    ]

    return top_data


def get_top_n_on_request(request, city, df=df, top_n=7):
    text_latents_name, image_latents = city_model[city]

    text_latents_name = text_latents_name.cpu()
    image_latents = image_latents.cpu()

    text_latents = get_request_embedding(request)
    text_latents = text_latents.cpu()

    # cosine sim
    text_cosine_sim = get_cosine_similarity(text_latents, text_latents_name)
    image_cosine_sim = get_cosine_similarity(text_latents, image_latents)

    # normalization
    text_cosine_sim_norm = normalize_scores(text_cosine_sim)
    image_cosine_sim_norm = normalize_scores(image_cosine_sim)

    # uniting scores
    united_cosine_sim_norm = text_cosine_sim_norm + image_cosine_sim_norm

    united_cosine_sim_normalized = united_cosine_sim_norm / 2

    # sorting indices
    # text_sorted_indices = torch.argsort(text_cosine_sim_norm, descending=True)
    # image_sorted_indices = torch.argsort(image_cosine_sim_norm, descending=True)
    united_sorted_indices = torch.argsort(united_cosine_sim_normalized, descending=True)

    # filtering unique places
    final_sorted_indices = filter_unique_places(united_sorted_indices, df)

    top_data = get_top_n_objects(
        df, final_sorted_indices, united_cosine_sim_normalized, top_n
    )

    return top_data


def get_image_request_embedding(request):
    request = [request]
    with torch.no_grad():
        text_latents = predictor.get_image_latents(request)

    return F.normalize(text_latents, p=2, dim=-1)


def get_top_n_on_image_request(request, city, df=df, top_n=7):
    text_latents_name, image_latents = city_model[city]

    request = Image.open(BytesIO(base64.b64decode(request))).convert("RGB")
    image_latents = image_latents.cpu()

    text_latents = get_image_request_embedding(request)
    text_latents = text_latents.cpu()

    # cosine sim
    image_cosine_sim = get_cosine_similarity(text_latents, image_latents)

    # sorting indices
    image_sorted_indices = torch.argsort(image_cosine_sim, descending=True)

    # filtering unique places
    final_sorted_indices = filter_unique_places(image_sorted_indices, df)

    top_data = get_top_n_objects(df, final_sorted_indices, image_cosine_sim, top_n)

    return top_data
