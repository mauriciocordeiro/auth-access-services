import os
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, flash, request, Flask
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError


app = Flask(__name__)


client = MongoClient('mongodb://' + os.environ['MONGODB_USERNAME'] + ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME'] + ':27017/' + os.environ['MONGODB_DATABASE'], authSource="admin")
db = client[os.environ['MONGODB_DATABASE']]


@app.route('/login', methods=['POST'])
def login():
	message = {
        'status': 200,
        'message': 'OK',
		'detail': 'Login works'
    }

	resp = jsonify(message)
	resp.status_code = 200
	return resp

@app.route('/logout', methods=['POST'])
def logout():
	message = {
        'status': 200,
        'message': 'OK',
		'detail': 'Logout works'
    }

	resp = jsonify(message)
	resp.status_code = 200
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