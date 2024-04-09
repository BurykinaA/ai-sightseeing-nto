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
from app.connection.sqllite3_connection import Sqlite3Connection


db_connection = Sqlite3Connection()



@cross_origin()
@object.get("/api/object")
def make_correction():
    try:
        object_info = get_object_info(db_connection, 'W38411380')

        # print(object_info)

        response = {
            'hui' : 'dsdsd'
        }

        return make_response(response, 200)

    except Exception as e:
        print(e)
        return make_response({"error": "no_body"})

