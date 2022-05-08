from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
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
    users = []
    for user in db.find():
        users.append({
            '_id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'password': user['password'],
        })
    return jsonify(users)


@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert_one({
        "name": request.json["name"],
        "email": request.json["email"],
        "password": request.json["password"]
    })
    return jsonify(str(ObjectId(id.inserted_id)))


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
