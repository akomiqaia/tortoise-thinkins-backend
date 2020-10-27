const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getRoomsHandler = require("./handlers/getRooms");
const {
  createThinkIn,
  startRecording,
  stopRecording,
  getArchiveList,
} = require("./handlers/tokBoxHandler");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("hi");
});
app.get("/rooms", getRoomsHandler);
app.get("/room/:name", createThinkIn); // Once we have form submission this has ro become post method

// routes for archiving
app.post("/startrecording", startRecording);
app.get("/stoprecording/:archiveId", stopRecording);
app.get("/archives", getArchiveList);

app.listen(PORT, function () {
  console.log(`You're app is now ready at http://localhost:${PORT}/`);
});
