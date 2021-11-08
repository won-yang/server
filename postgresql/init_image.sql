DROP TABLE IF EXISTS IMAGE;
CREATE TABLE IMAGE
(
	id SERIAL PRIMARY KEY,
	post_id INTEGER,
	image_url VARCHAR(100)
);

INSERT INTO IMAGE (post_id, image_url) VALUES
  (1, 'https://cityhiker.s3.ap-northeast-2.amazonaws.com/1.webp');