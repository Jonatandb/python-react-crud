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


@app.route('/users', methods=['GET'])
def getUsers():
    return 'getUsers'


@app.route('/users', methods=['POST'])
def createUser():
    return 'createUser'


@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    return 'getUser'


@app.route('/user/<id>', methods=['PUT'])
def updateUser(id):
    return 'updateUser'


@app.route('/user/<id>', methods=['DELETE'])
def deleteUser(id):
    return 'deleteUser'


if __name__ == "__main__":
    app.run(debug=True)
