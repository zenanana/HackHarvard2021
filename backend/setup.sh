sqlite3 si.db "CREATE TABLE si(socialID INTEGER, title TEXT, description TEXT, picture BLOB);"
sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, groupsChampioned TEXT, picture BLOB);"
sqlite3 event.db "CREATE TABLE event(eventID INTEGER, type TEXT, socialIssue INTEGER, userContributed TEXT, picture BLOB);"