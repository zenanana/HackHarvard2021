from flask import Flask
import sqlite3
import datetime
import os

app = Flask(__name__)

### SQLITE3 DATABASES
DB_SI = 'si.db'
DB_USER = 'user.db'
DB_EVENT = 'event.db'

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
	app.run(debug=True)