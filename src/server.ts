import * as express from "express";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 8080);

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
  res.sendFile(path.resolve("./dist/chat.html"));
});

io.on("connection", function(socket: any) {
  console.log("a user connected "+socket.id);

    socket.on("message", function(message: any) {
      console.log(message);
    });
  });
  //socket.on('chatMessage', function (chatMessage: ChatMessage) {
 //   socket.broadcast.emit('chatMessage', chatMessage)
// });
// });

const server = http.listen(8080, function() {
  console.log("listening on *:8080");
});