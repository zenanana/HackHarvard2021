sqlite3 si.db "CREATE TABLE si(socialID INTEGER, date TEXT, title TEXT, description TEXT, picture BLOB);"
### THIS IS CONFIRMED

sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, interest TEXT, pronoun TEXT, bio TEXT, picture BLOB);"
### THIS IS ALSO CONFIRMED

sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, title TEXT, description TEXT, userID INTEGER, picture BLOB);"
### THIS IS ALSO CONFIRMED


sqlite3 user.db "CREATE TABLE user(userID INTEGER, userName TEXT, groupsChampioned TEXT, picture BLOB);"


sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, title TEXT, description TEXT, picture BLOB);"

sqlite3 event.db "CREATE TABLE event(eventID INTEGER, date TEXT, type TEXT, socialIssue INTEGER, userContributed TEXT, picture BLOB);"


INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(1, '2021-10-05', 'comment', 1, 'Comment', 'Down with global warming! Find out more about how big oil companies harm the planet <a href="https://www.youtube.com/watch?v=uKxyLmbOc0Q" target="_blank">here</a>!', 2, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(2, '2021-10-06', 'comment', 1, 'Comment', "Agreed! Let's march this Saturday morning!", 3, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(3, '2021-10-07', 'comment', 1, 'Comment', 'Hi new members! Climate change is an extremely pressing matter backed by decades of scientific evidence. Please check out the useful links and previous contributions to the cause on the right panel on this page! Hope to see you get involved in our cause! Planet Earth is under attack, we stand up and fight back!', 4, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(4, '2021-10-05', 'comment', 2, 'Comment', 'Everyone deserves to have basic human rights! Strike down systematic oppression!', 4, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(5, '2021-10-06', 'comment', 2, 'Comment', 'Please direct more attention to the humanitarian crisis in Xinjiang - a gross violation of human rights!', 3, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(6, '2021-10-05', 'comment', 3, 'Comment', 'Enough is enough! Check out the sidebar to find out how to be an ally.', 2, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(7, '2021-10-06', 'comment', 4, 'Comment', "The War on Drugs is evidently killing more people than it claims to help. Let\'s stop this right now and start legalizing certain drugs such as weed.", 4, '');

INSERT INTO event(eventID, date, type, socialIssue, title, description, userID, picture) VALUES(8, '2021-10-07', 'comment', 4, 'Comment', "Agreed. Ample scientific evidence for the benefits of certain drugs, such as LSD, mushrooms and weed, have been found. Let\'s not delay any further - there are people dying that could be saved by legalizaiton.", 3, '');
