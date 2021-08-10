"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 8080);
let http = require("http").Server(app);
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./dist/chat.html"));
});
io.on("connection", function (socket) {
    console.log("a user connected " + socket.id);
    socket.on("message", function (message) {
        console.log(message);
    });
});
//socket.on('chatMessage', function (chatMessage: ChatMessage) {
//   socket.broadcast.emit('chatMessage', chatMessage)
// });
// });
const server = http.listen(8080, function () {
    console.log("listening on *:8080");
});
//# sourceMappingURL=server.js.map