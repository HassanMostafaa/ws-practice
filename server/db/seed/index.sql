-- USERRS TABLE SEED
INSERT INTO users (name, email) VALUES ('Hassan','has@has.com');
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com');

-- MESSAGES TABLE SEED
INSERT INTO messages (user_id, content) VALUES (1, 'Hello world!');
INSERT INTO messages (user_id, content) VALUES (3, 'Hi Alice!');

-- SERVER LOCATION TABLE SEED
INSERT INTO server_location (location) VALUES ('USA, New York');