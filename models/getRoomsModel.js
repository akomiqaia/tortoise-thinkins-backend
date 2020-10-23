const db = require('../db/connection');

function getRooms() {
    return db
    .query('SELECT * FROM tortoise_sessions')
    .then(name => name.rows)
    .catch(error => error)
}

module.exports = getRooms;
