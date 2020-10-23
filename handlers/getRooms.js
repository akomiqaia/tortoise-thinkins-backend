const getRooms = require("../models/getRoomsModel");

function getRoomsHandler(req, res, next) {
  getRooms().then((data) => {
    const rooms = data;
    res.setHeader("Content-Type", "application/json");
    res.send({
      rooms,
    });
  });
}

module.exports = getRoomsHandler;
