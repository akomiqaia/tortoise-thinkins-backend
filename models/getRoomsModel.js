const db = require('../db/connection');
function getRooms(name) {
    return db
    .query('SELECT * FROM tortoise_sessions')
    .then(name => name.rows[0])
    .catch(error => error)
}

module.exports = getRooms;
