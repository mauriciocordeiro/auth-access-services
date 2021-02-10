import os
import requests
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, flash, request, Flask
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from datetime import datetime


app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE'], authSource="admin")
db = client[os.environ['MONGODB_DATABASE']]


@app.route('/logs', methods=['POST'])
def add_log():
	_json = request.json
	_email = _json['email']
	_timestamp = _json['timestamp']
	_action = _json['action']
	
	id = db.log.insert({'email': _email, 'timestamp': _timestamp, 'action': _action})
	resp = jsonify({'_id': str(id), 'email': _email, 'timestamp': _timestamp, 'action': _action})
	resp.status_code = 201
	return resp


@app.route('/logs', methods=['GET'])
def users():
	logs = db.log.find().sort("timestamp", -1)
	resp = dumps(logs)
	return resp


@app.route('/status/app', methods=['GET'])
def index():
	message = {
        'status': 200,
        'message': 'OK',
		'detail': 'Seems fine'
    }

	resp = jsonify(message)
	resp.status_code = 200
	return resp


@app.route('/status/db', methods=['GET'])
def status_db():
	try: 
		info = client.server_info()
		resp = jsonify(info)
		resp.status_code = 200
		return resp
	except ServerSelectionTimeoutError as err:
		message = {
			'status': 500,
			'message': 'Internal Server Error',
			'detail': str(err)
		}

		resp = jsonify(message)
		resp.status_code = 500
		return resp


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp


if __name__ == "__main__":
    app.run()