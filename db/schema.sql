BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE; 
-- sadhsaduhsdh

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(225) NOT NULL
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    post TEXT NOT NULL,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE 
);

INSERT INTO users (username) VALUES ('tom'), ('ako'), ('Ivo'), ('Vats');

INSERT INTO blog_posts (author_id, post) VALUES 
(1, 'great stuff'),
(2, 'very good stuff'),
(3, 'we are gonna smash it'),
(4, 'Wait, i am not ready'),
(1, 'great stuff'),
(2, 'very good stuff'),
(3, 'we are gonna smash it'),
(4, 'Wait, i am not ready');
(1, 'great stuff'),
(2, 'very good stuff'),
(3, 'we are gonna smash it'),
(4, 'Wait, i am not ready'),
(1, 'great stuff'),
(2, 'very good stuff'),
(3, 'we are gonna smash it'),
(4, 'Wait, i am not ready');
COMMIT;