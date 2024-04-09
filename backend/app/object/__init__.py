from flask import Blueprint

object = Blueprint("object", __name__)

from app.object import routes
