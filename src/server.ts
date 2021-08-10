import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 4000);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./dist/chat.html"));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected "+socket.id);
  socket.on("new_message", function(message: any) {
    console.log("message from Client"+message);
    // echo the message back down the
    // websocket connection
    socket.emit("message", message);
  });
  //socket.on('chatMessage', function (chatMessage: ChatMessage) {
 //   socket.broadcast.emit('chatMessage', chatMessage)
//});
});

const server = http.listen(4000, function() {
  console.log("listening on *:3000");
});