from app.object import object
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

# import numpy as np
# from PIL import Image
# import base64
# import io
# import cv2

from app.queries.queries import (
    get_object_info,
    get_filtered_objects_info,
    get_coords,
    get_name_info,
    get_name_by_id,
    get_object_info_ml,
)

from app.models.text2img.model_txt2lmg import get_top_n_on_image_request

type = [
    {"id": 0, "value": "Музеи и памятники"},
    {"id": 1, "value": "Религиозные места"},
    {"id": 2, "value": "Рестораны и еда"},
    {"id": 3, "value": "Природные объекты"},
    {"id": 4, "value": "Спорт и развлечения"},
    {"id": 5, "value": "Финансовые и банковские учреждения"},
    {"id": 6, "value": "Туристические объекты"},
    {"id": 7, "value": "Другие места"},
    {"id": 8, "value": "Архитектурные объекты"},
]

type_cat = {
    "0": "Музеи и памятники",
    "1": "Религиозные места",
    "2": "Рестораны и еда",
    "3": "Природные объекты",
    "4": "Спорт и развлечения",
    "5": "Финансовые и банковские учреждения",
    "6": "Туристические объекты",
    "7": "Другие места",
    "8": "Архитектурные объекты",
}

rate = [
    {"id": 0, "value": "3h"},
    {"id": 1, "value": "3"},
    {"id": 2, "value": "2"},
    {"id": 3, "value": "1"},
    {"id": 4, "value": "2h"},
]

rate_cat = {"0": "3h", "1": "3", "2": "2", "3": "1", "4": "2h"}


@cross_origin()
@object.get("/api/object")
def get_objects():
    try:
        city = request.args.get("city")

        kind = request.args.get("category")
        kind = [type_cat[i] for i in kind.split(",")] if kind is not None else None

        rate = request.args.get("rate")
        rate = [rate_cat[i] for i in rate.split(",")] if rate is not None else None

        page = int(request.args.get("page", 1))
        limit = int(request.args.get("_limit", 10))

        offset = (page - 1) * limit
        object_info = get_filtered_objects_info(city, kind, rate, limit, offset)

        return make_response(object_info, 200)
    except Exception as e:
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.get("/api/object/<id>/same")
def get_object_by_id_same(id):
    try:
        data = get_name_by_id(id)

        city = data['city']
        img = data['photo']

        city_mapping = {
            'Екатеринбург': 'ekb',
            'Нижний Новгород': 'nn',
            'Владимир': 'vlad',
            'Ярославль': 'yar',
        }

        response = get_top_n_on_image_request(img, city_mapping[city])

        print("response")

        ans = [get_object_info_ml(i[0]) for i in response]

        # for i in range(len(ans)):
        #     ans[i]["score"] = str(float(response[i][1]))
        #     ans[i]["label"] = ans[i]['name']
        
        return make_response(ans, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.get("/api/object/<id>")
def get_object_by_id(id):
    try:
        object_info = get_object_info(id)

        return make_response(object_info, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.get("/api/filters")
def get_filters():
    try:
        return make_response({"type": type, "rate": rate}, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.get("/api/object_coordinates")
def get_coords_api():
    try:
        return make_response(get_coords(), 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


@cross_origin()
@object.post("/api/name_reseach")
def get_text_api():
    try:
        data = request.json["text"]
        response = get_name_info(data)

        for i in range(len(response)):
            response[i]["label"] = response[i]['name']

        return make_response(response, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
