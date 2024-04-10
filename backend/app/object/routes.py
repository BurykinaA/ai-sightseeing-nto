from app.object import object
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

# import numpy as np
# from PIL import Image
# import base64
# import io
# import cv2

from app.queries.queries import get_object_info, get_filtered_objects_info, get_coords


@cross_origin()
@object.get("/api/object/<id>")
def get_object_by_id(id):
    try:
        object_info = get_object_info(id)
        return make_response(get_object_info(object_info), 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)


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

rate = [
    {"id": 0, "value": "3h"},
    {"id": 1, "value": "3"},
    {"id": 2, "value": "2"},
    {"id": 3, "value": "1"},
    {"id": 4, "value": "2h"},
]


@cross_origin()
@object.get("/api/object")
def get_objects():
    try:
        city = request.args.get("city")
        kind = request.args.get("category")
        rate = request.args.get("rate")
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("_limit", 10))

        offset = (page - 1) * limit

        object_info = get_filtered_objects_info(city, kind, rate, limit, offset)

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
@object.get("/api/filters")
def get_coords():
    try:
        return make_response(get_coords, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
