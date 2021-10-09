from flask import Flask, request, g, render_template
from flask_cors import CORS
import sqlite3
import datetime
import json
import os

app = Flask(__name__)
CORS(app)

### SQLITE3 DATABASES
DB_SI = 'si.db'
DB_USER = 'user.db'
DB_EVENT = 'event.db'

### DATABASE FUNCTIONS

def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		db = g._database = sqlite3.connect(DB_SI)
	return db

def query_db(query, args=(), one=False, cmt=False):
	conn = get_db()
	cur = conn.execute(query, args)
	if cmt:
		conn.commit()
	rv = cur.fetchall()
	cur.close()
	return (rv[0] if rv else None) if one else rv

def get_db_user():
	db = getattr(g, '_database_user', None)
	if db is None:
		db = g._database = sqlite3.connect(DB_USER)
	return db

def query_db_user(query, args=(), one=False, cmt=False):
	conn = get_db_user()
	cur = conn.execute(query, args)
	if cmt:
		conn.commit()
	rv = cur.fetchall()
	cur.close()
	return (rv[0] if rv else None) if one else rv

def get_db_event():
	db = getattr(g, '_database_event', None)
	if db is None:
		db = g._database = sqlite3.connect(DB_EVENT)
	return db

def query_db_event(query, args=(), one=False, cmt=False):
	conn = get_db_event()
	cur = conn.execute(query, args)
	if cmt:
		conn.commit()
	rv = cur.fetchall()
	cur.close()
	return (rv[0] if rv else None) if one else rv

def _getUser(userName):
	x = query_db_user('SELECT * FROM user WHERE userName="{}"'.format(userName))
	return x

def _getUserID(userID):
	x = query_db_user('SELECT * FROM user WHERE userID={}'.format(userID))
	return x

def _getNextUserID():
	x = query_db_user('SELECT MAX(userID) FROM user')
	if len(x) == 0:
		return 0
	
	app.logger.info("max id = {}".format(x))
	return x[0][0] + 1

def _getSI():
	return query_db('SELECT * FROM si')

def _getNextSIID():
	#x = query_db('SELECT MAX(socialID) FROM si')
	x = query_db('SELECT * FROM si')
	if (len(x) == 0):
		return 0
	return x[0][0] + 1

def _getNextEventID():
	x = query_db_event('SELECT MAX(eventID) FROM event')
	if (len(x) == 0):
		return 0
	return x[0][0] + 1

def _getSIID(si_name):
	app.logger.info('SELECT socialID FROM si WHERE title="{}"'.format(si_name))
	x = query_db('SELECT socialID FROM si WHERE title="{}"'.format(si_name))
	if (len(x) == 0):
		return 0
	return x[0][0]

def _getEvent():
	return query_db_event('SELECT * FROM event')

### MAIN PAGE ENDPOINTS

### GET A LIST ALL SOCIAL ISSUES
@app.route("/list_si", methods=['GET'])
def list_si():
    return json.dumps(list(_getSI()))

### CREATE A SOCIAL ISSUE
@app.route("/create_si", methods=['POST'])
def create_si():
	app.logger.info("CALLED - create_si")
    
    ### check if userName is taken
	data = request.json
	#app.logger.info("Data received = {}".format(data))
	app.logger.info(type(data))
	if ("title" not in data or "description" not in data or "date" not in data):
		app.logger.info("not valid data")
		return "Failed to add social issue"
	if data["date"] == "":
		data["date"] = datetime.datetime.now().strftime("%Y-%m-%d")
	
	siid = _getNextSIID()

	picture = '' if ("picture" not in data) else data["picture"]
	query_db('INSERT INTO si(socialID, date, title, description, picture) VALUES("{}", "{}", "{}", "{}", "{}")'.format(siid, data["date"], data["title"], data["description"], str(picture)), cmt=True)
	return "Success"

### ISSUE PAGE ENDPOINTS

@app.route("/list_event", methods=['GET'])
def get_event():
    return str(_getEvent())

@app.route("/create_event", methods=['POST'])
def create_event():
	app.logger.info("CALLED - create_event")

	data = request.json
	#app.logger.info("Data received = {}".format(data))
	app.logger.info(type(data))
	if ("title" not in data or "description" not in data or "date" not in data or "scale" not in data or "si" not in data):
		app.logger.info("not valid data")
		return "Failed to add event"
	if data["date"] == "":
		data["date"] = datetime.datetime.now().strftime("%Y-%m-%d")
	
	eventid = _getNextEventID()
	app.logger.info("ADDING EVENT ID {}".format(eventid))
	picture = '' if ("picture" not in data) else data["picture"]
	query_db_event('INSERT INTO event(eventID, date, type, socialIssue, title, description, picture) VALUES({}, "{}", "{}", "{}", "{}", "{}", "{}")'.format(eventid, data["date"], data["scale"], "women rights", data["title"], data["description"], str(picture)), cmt=True)
	return "Success"

### USER PAGE ENDPOINTS

@app.route("/create_user", methods=['POST'])
def create_user():
	app.logger.info("CALLED - create_user")
    
    ### check if userName is taken
	data = request.json
	#app.logger.info("Data received = {}".format(data))
	app.logger.info(type(data))
	if ("userName" not in data):
		app.logger.info("userName not found in data")
		return "Failed to add contact"
	### check repeated username
	userID = _getNextUserID()
	### edit this part
	groupsChampioned = []

	picture = '' if ("picture" not in data) else data["picture"]
	query_db_user('INSERT INTO user(userID, userName, groupsChampioned, picture) VALUES("{}", "{}", "{}", "{}")'.format(userID, data["userName"], str(groupsChampioned), str(picture)), cmt=True)
	return "Success"

@app.route("/get_user", methods=['GET'])
def get_user():
	app.logger.info("CALLED - get_user")
	userName = request.args.get('user')
	x = _getUser(userName)
	res = []
	for j in x:
		res.append(list(j))
	app.logger.info(x)
	return json.dumps(res)

@app.route("/get_userID", methods=['GET'])
def get_userID():
	app.logger.info("CALLED - get_userID")
	userID = request.args.get('userID')
	x = _getUserID(userID)
	res = []
	for j in x:
		res.append(list(j))
	app.logger.info(x)
	return json.dumps(res)

### MISC FUNCTIONS

if __name__ == "__main__":
	app.run(debug=True)