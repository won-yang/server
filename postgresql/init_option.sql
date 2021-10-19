DROP TYPE IF EXISTS CATEGORY_T;
CREATE TYPE CATEGORY_T AS ENUM('HOME_APPLIANCE', 'FURNITURE', 'ETC');

DROP TABLE IF EXISTS OPTION;
CREATE TABLE OPTION
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100), -- 세탁기
	category CATEGORY_T -- 가전제품
);

DROP TABLE IF EXISTS PostOption;
CREATE TABLE PostOption
(
	post_id INTEGER,
	option_id INTEGER
);

INSERT INTO OPTION (name, category) VALUES ('세탁기', 'HOME_APPLIANCE');
INSERT INTO OPTION (name, category) VALUES ('전자레인지', 'HOME_APPLIANCE');
INSERT INTO OPTION (name, category) VALUES ('침대', 'FURNITURE');
INSERT INTO OPTION (name, category) VALUES ('옷장', 'FURNITURE');
INSERT INTO OPTION (name, category) VALUES ('담곰인형', 'ETC');

INSERT INTO PostOption (post_id, option_id) VALUES (1, 1);
INSERT INTO PostOption (post_id, option_id) VALUES (1, 2);
INSERT INTO PostOption (post_id, option_id) VALUES (1, 3);
INSERT INTO PostOption (post_id, option_id) VALUES (1, 4);
INSERT INTO PostOption (post_id, option_id) VALUES (1, 5);
INSERT INTO PostOption (post_id, option_id) VALUES (2, 1);
INSERT INTO PostOption (post_id, option_id) VALUES (3, 1);


