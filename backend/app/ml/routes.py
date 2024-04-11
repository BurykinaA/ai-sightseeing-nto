from app.ml import ml
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

# import numpy as np
# from PIL import Image
# import base64
# import io
# import cv2

from app.queries.queries import get_object_info_ml
from app.models.text2img.model_txt2lmg import (
    get_top_n_on_request,
    get_top_n_on_image_request,
)
from app.models.img2label.model_i2l import get_lables


@cross_origin()
@ml.post("/api/text_reseach")
def get_text_api():
    try:
        text = request.json["text"]
        city = request.json["city"][0]['id']
        response = get_top_n_on_request(text, city)
    
        ans = [get_object_info_ml(i[0]) for i in response]

        for i in range(len(ans)):
            ans[i]["score"] = str(float(response[i][1]))
            ans[i]["label"] = ans[i]['name']

        return make_response(ans, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@ml.post("/api/picture_reseach")
def get_pict_api():
    try:
        data = request.json["pictures"][0]["file"]
        city = request.json["city"]['id']

        response = get_top_n_on_image_request(data, city)

        ans = [get_object_info_ml(i[0]) for i in response]

        for i in range(len(ans)):
            ans[i]["score"] = str(float(response[i][1]))
            ans[i]["label"] = ans[i]['name']

        return make_response(ans, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@ml.post("/api/picture_category")
def get_label_api():
    try:
        data = request.json["pictures"][0]["file"]
        city = request.json["city"]["id"]

        response = get_lables(data, city)
        return make_response(response, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
