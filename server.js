
const express = require("express");
const cors = require("cors");
const createRoom = require('./handlers/roomHandler')
const getRoomsHandler = require('./handlers/getRooms')
const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/rooms", getRoomsHandler)
app.get("/room/:name", createRoom);

app.listen(PORT, function () {
  console.log(`You're app is now ready at http://localhost:${PORT}/`);
});

