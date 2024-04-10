from app.object import object
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

# import numpy as np
# from PIL import Image
# import base64
# import io
# import cv2

from app.queries.queries import get_object_info, get_filtered_objects_info
from app.connection.sqllite3_connection import Sqlite3Connection


db_connection = Sqlite3Connection()


@cross_origin()
@object.get("/api/object")
def get_object_by_id(id):
    try:
        object_info = get_object_info(db_connection, id)
        return make_response(object_info, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
    

@cross_origin()
@object.get("/api/object")
def get_objects():
    try:
        city = request.args.get('city')
        kind = request.args.get('category')
        rate = request.args.get('rate')

        object_info = get_filtered_objects_info(db_connection, city, kind, rate)
    
        return make_response(object_info, 200)
    except Exception as e:
        print(e)
        return make_response({"error": "Internal Server Error"}, 500)
