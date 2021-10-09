python3 -m venv sj
source sj/bin/activate
pip3 install -r requirements.txt
sqlite3 si.db "CREATE TABLE si(socialID INTEGER, date TEXT, title TEXT, description TEXT, picture BLOB);"
sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, interest TEXT, pronoun TEXT, bio TEXT, picture BLOB);"
sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, title TEXT, description TEXT, userID INTEGER, picture BLOB);"




