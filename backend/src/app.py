from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

app.config['MONGO_URI'] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)

db = mongo.db.users


@app.route('/')
def hello_world():
    return '<h1>Hello World!</h1>'


if __name__ == "__main__":
    app.run(debug=True)
