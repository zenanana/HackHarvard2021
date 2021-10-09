sqlite3 si.db "CREATE TABLE si(socialID INTEGER, date TEXT, title TEXT, description TEXT, picture BLOB);"
### THIS IS CONFIRMED

sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, interest TEXT, pronoun TEXT, bio TEXT, picture BLOB);"
### THIS IS ALSO CONFIRMED

sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, groupsChampioned TEXT, picture BLOB);"


sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, title TEXT, description TEXT, picture BLOB);"

sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, userContributed TEXT, picture BLOB);"


INSERT INTO event(eventID, date, type, socialIssue, title, description, picture) VALUES(0, '2021-10-08', 'big', 0, 'Campaign', 'Women rights', '');