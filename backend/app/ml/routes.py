from app.object import object
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

# import numpy as np
# from PIL import Image
# import base64
# import io
# import cv2

from app.queries.queries import get_object_info
from app.models.text2img.model_txt2lmg import get_top_n_on_request
from app.models.img2label import get_lables


@cross_origin()
@object.post("/api/name_research")
def get_text_api():
    try:
        text = request.json["text"]
        city = request.json["city"]
        response = get_top_n_on_request(text, city)
        ans = [get_object_info(i[0]) for i in response]

        for i in range(len(ans)):
            ans[i]["score"] = response[i][1]

        return make_response(response, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.post("/api/picture_reseach")
def get_text_api():
    try:
        text = request.json["text"]
        data = request.json["base64"]
        response = ML_DANA(data, text)
        response = get_object_info(response)
        return make_response(response, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.post("/api/picture_category")
def get_text_api():
    try:
        data = request.json["base64"]
        city = request.json["city"]
        response = get_lables(data, city)
        return make_response(response, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
