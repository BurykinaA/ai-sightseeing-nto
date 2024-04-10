import torch.nn.functional as F
import ruclip
import torch

model, processor = ruclip.load('ruclip-vit-base-patch32-384', device="cuda:0")


def get_request_embedding(request):
    request = [request]
    with torch.no_grad():
        text_latents = predictor.get_text_latents(request)

    return F.normalize(text_latents, p=2, dim=-1)


def get_cosine_similarity(request_latents, other_latents):
    cosine_similarities = torch.matmul(request_latents, other_latents.T)

    cosine_similarities = cosine_similarities.flatten()

    return cosine_similarities
