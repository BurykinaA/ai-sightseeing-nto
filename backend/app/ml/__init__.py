from flask import Blueprint

ml = Blueprint("ml", __name__)

from app.object import routes
