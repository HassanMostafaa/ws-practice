-- USERRS TABLE SEED
INSERT INTO users (name, email) VALUES ('Hassan','has@has.com');
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');

-- MESSAGES TABLE SEED
INSERT INTO messages (user_id, content) VALUES (1, 'Hello world!');
INSERT INTO messages (user_id, content) VALUES (3, 'Hi Alice!');

-- SERVER LOCATION TABLE SEED
INSERT INTO server_location (location) VALUES ('DATABASE VALUE => USA, New York');

-- NOTES TABLE SEED
INSERT INTO notes (title, content, username) VALUES ('First note', 'This is my first note content passed from server db seed', 'hassan');
INSERT INTO notes (title, content, username) VALUES ('Second note', 'This is my second note content passed from server db seed', 'hassan');
INSERT INTO notes (title, content, username) VALUES ('Third note', 'This is my third note content passed from server db seed', 'hassan');
INSERT INTO notes (title, content, username) VALUES ('Fourth note', 'This is my fourth note content passed from server db seed', 'hassan');