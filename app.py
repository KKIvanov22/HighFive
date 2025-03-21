import flask
from flask import request, jsonify
import json
import requests
import webbrowser
import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS

from src_backend.auth_controller import register_handler, login_handler, get_user_handler
from src_backend.image_controller import upload_image_handler

cred = credentials.Certificate("highfive.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://highfive-beafa-default-rtdb.europe-west1.firebasedatabase.app"
})

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    return register_handler()

@app.route('/login', methods=['POST'])
def login():
    return login_handler()

@app.route('/get_user', methods=['GET'])
def get_user():
    return get_user_handler()

@app.route('/upload_image', methods=['POST'])
def upload_image():
    return upload_image_handler()

if __name__ == '__main__':
    app.run()