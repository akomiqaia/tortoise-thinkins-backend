BEGIN;

DROP TABLE IF EXISTS tortoise_sessions CASCADE; 
-- sadhsaduhsdh

CREATE TABLE tortoise_sessions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    sessionId VARCHAR(225) NOT NULL
);


COMMIT;