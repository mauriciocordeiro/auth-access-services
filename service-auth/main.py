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


@app.route('/login', methods=['POST'])
def login():
	_json = request.json
	_email = _json['email']
	_password = _json['pwd']

	status = 401
	message = {
        'status': 401,
        'message': 'Unauthorized',
		'detail': 'Email ou senha incorretos.'
    }

	user = db.user.find_one({'email': _email, 'pwd': _password})

	if user != None:
		user.update({'_id':str(user.get("_id"))})
		user.update({'pwd':''})
		message = {
			'status': 200,
			'message': 'Logged in',
			'detail': str(user).replace("'", "\"")
		}	
		status = 200

	log(_email, 'User LOGGED IN')

	resp = jsonify(message)
	resp.status_code = status
	return resp


@app.route('/logout', methods=['POST'])
def logout():
	_json = request.json
	_email = _json['email']

	message = {
        'status': 200,
        'message': 'OK',
		'detail': 'Logout'
    }

	log(_email, 'User LOGGED OUT')

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
		message = {
			'status': 200,
			'message': 'Ok',
			'detail': str(client.server_info())
		}

		resp = jsonify(message)
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


@app.errorhandler(500)
def nternal_server_error(error=None):
    message = {
        'status': 500,
        'message': 'Internal Server Error' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 500

    return resp


def log(email, action):
	payload = {
		'timestamp': datetime.now().isoformat(),
		'email': email,
		'action': action
	}

	requests.post("http://log:5003/logs", json=payload)


if __name__ == "__main__":
    app.run()