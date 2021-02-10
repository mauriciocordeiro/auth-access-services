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


@app.route('/users', methods=['POST'])
def add_user():
	_json = request.json
	_name = _json['name']
	_email = _json['email']
	_password = _json['pwd']

	if db.user.find_one({'email': _email}) != None:
		return bad_request('User already exists')
	
	# validate the received values
	if _name and _email and _password and request.method == 'POST':
		# save details
		id = db.user.insert({'name': _name, 'email': _email, 'pwd': _password})
		log(_email, 'User CREATED')
		resp = jsonify({'_id': str(id), 'name': _name, 'email': _email, 'pwd': _password})
		resp.status_code = 201
		return resp
	else:
		return not_found()

		
		

@app.route('/users', methods=['GET'])
def users():
	users = db.user.find().sort("name", 1)
	resp = dumps(users)

	# log('---', 'GET /users')

	return resp


@app.route('/users/<id>', methods=['GET'])
def user(id):
	user = db.user.find_one({'_id': ObjectId(id)})
	resp = dumps(user)

	# log('---', 'GET /users/'+id)

	return resp


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
	_json = request.json
	_id = id
	_name = _json['name']
	_email = _json['email']
	_password = _json['pwd']	

	log(_email, 'User UPDATED')

	# validate the received values
	if _name and _email and _password and _id and request.method == 'PUT':
		# save edits
		db.user.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'name': _name, 'email': _email, 'pwd': _password}})
		resp = jsonify('User updated successfully!')
		resp.status_code = 200
		return resp
	else:
		return not_found()


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
	user = db.user.find_one({'_id': ObjectId(id)})

	db.user.delete_one({'_id': ObjectId(id)})
	resp = jsonify('User deleted successfully!')
	resp.status_code = 200

	log(user.email, 'User DELETED')

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


@app.errorhandler(400)
def bad_request(error=None):
    message = {
        'status': 400,
        'message': error,
		'detail': 'Bad Request'
    }
    resp = jsonify(message)
    resp.status_code = 400

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