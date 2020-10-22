const db = require('../db/connection');

function createRoom(name, sessionId) {
  return db
    .query("INSERT INTO tortoise_sessions(name, sessionId) VALUES ($1, $2)", [
      name,
      sessionId,
    ])
    .then(() => {
      return getRoom(name);
    })
    .catch((error) => console.error(error));
}

function getRoom(name) {
    return db
    .query('SELECT * FROM tortoise_sessions WHERE name=($1)', [name])
    .then(name => name.rows[0])
    .catch(error => error)
}

module.exports = { createRoom, getRoom };
