from flask import Flask, request, make_response
from config import DevelopmentConfig
from app.object import object
from app.ml import ml


from flask_cors import CORS


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)

    blueprints = [object, ml]
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    CORS(app)

    @app.after_request
    def after_request_func(response):
        origin = request.headers.get("Origin")
        if request.method == "OPTIONS":
            response = make_response()
            response.headers.add("Access-Control-Allow-Credentials", "true")
            response.headers.add("Access-Control-Allow-Headers", "Content-Type")
            response.headers.add("Access-Control-Allow-Headers", "x-csrf-token")
            response.headers.add(
                "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            )
            if origin:
                response.headers.add("Access-Control-Allow-Origin", origin)
        else:
            response.headers.add("Access-Control-Allow-Credentials", "true")
            if origin:
                response.headers.add("Access-Control-Allow-Origin", origin)

        return response

    return app
