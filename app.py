import flask
from flask import request, jsonify
import json
import requests
import webbrowser
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("highfive.json")
firebase_admin.initialize_app(cred, {
    "databaseURL": "https://highfive-beafa-default-rtdb.europe-west1.firebasedatabase.app"
})

app = flask.Flask(__name__)
app.config["DEBUG"] = True


if __name__ == '__main__':
    app.run()