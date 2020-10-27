require("dotenv").config();
const OpenTok = require("opentok");

const room = require("../models/room");

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("You must specify API_KEY and API_SECRET environment variables");
  process.exit(1);
}

const opentok = new OpenTok(apiKey, apiSecret);

function createThinkIn(req, res, next) {
  const roomName = req.params.name;
  console.log(
    "attempting to create a session associated with the room: " + roomName
  );
  // if the room name is associated with a session ID, fetch that
  room.getRoom(roomName).then((data) => {
    if (data) {
      console.log("data", data);
      const sessionId = data.sessionid;
      // generate token
      const token = opentok.generateToken(sessionId);
      console.log("token from already existing rooms", token);
      res.setHeader("Content-Type", "application/json");
      res.send({
        apiKey: apiKey,
        sessionId: sessionId,
        token: token,
      });
    } else {
      opentok.createSession({ mediaMode: "routed" }, (error, session) => {
        if (error) {
          console.log(error);
          res.status(500).send({ error: `Create session error: ${error}` });
          return;
        }
        // now that the room name has a session associated wit it, store it in memory
        // IMPORTANT: Because this is stored in memory, restarting your server will reset these values
        // if you want to store a room-to-session association in your production application
        // you should use a more persistent storage for them
        room.createRoom(roomName, session.sessionId);

        // generate token
        const token = opentok.generateToken(session.sessionId);
        res.setHeader("content-type", "application/json");
        res.send({
          apiKey: apiKey,
          sessionId: session.sessionId,
          token: token,
        });
      });
    }
  });
}

function startRecording(req, res, next) {
  const hasAudio = req.body.hasAudio !== undefined;
  const hasVideo = req.body.hasVideo !== undefined;
  const archiveName = req.body.archiveName;
  const outputMode = req.body.outputMode;
  const sessionId = req.body.sessionId;

  const archiveOptions = {
    name: archiveName,
    hasAudio: hasAudio,
    hasVideo: hasVideo,
    outputMode: outputMode,
  };
  if (outputMode === "composed") {
    archiveOptions.layout = { type: "horizontalPresentation" };
  }
  room.getSessionId(sessionId).then(data => {
    opentok.startArchive(
      data.sessionid,
      archiveOptions,
      (err, archive) => {
        if (err) {
          return res.status(500).send(
            "Could not start archive for session " +
            room.getSessionId(data.sessionid) +
            ". error=" +
            err.message
            );
          }
          return res.status(200).json(archive);
        }
        );
      })

}

function stopRecording(req, res, next) {
  const { archiveId } = req.params;
  opentok.stopArchive(archiveId, (err, archive) => {
    if (err)
      return res
        .status(500)
        .send(`Could not stop archive ${archiveId} - ${err.message}`);
    return res.status(200).json(archive);
  });
}

function getArchiveList(req, res, next) {
  opentok.listArchives({}, (err, archives) => {
    if (err)
      return res.send(500, "Could not list archives. error=" + err.message);
    return res.status(200).json({ archives });
  });
}

module.exports = {
  createThinkIn,
  startRecording,
  stopRecording,
  getArchiveList,
};
