DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS
(
	id SERIAL PRIMARY KEY,
	auth_id VARCHAR(30) NOT NULL,
	nickname VARCHAR(30),
	campus_id INT DEFAULT NULL,
	last_login TIMESTAMP DEFAULT NULL
);

INSERT INTO USERS (auth_id, nickname, campus_id, last_login) VALUES ('1234','MIMMIM', 0, current_timestamp);
commit;

SELECT * FROM USERS;