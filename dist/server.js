"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const port = 8080;
class Server {
    constructor(port) {
        this.port = port;
        const app = express();
        app.use("/static", express.static('./static/'));
        app.get("/", (req, res) => {
            res.sendFile(path.resolve("./dist/chat.html"));
        });
        this.server = new http.Server(app);
        this.io = new socketIO.Server(this.server);
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            socket.on('disconnect', () => {
                console.log('socket disconnected : ' + socket.id);
            });
            this.io.on("new_message", function (message) {
                // console.log("message from Client"+message);
                // // echo the message back down the
                // // websocket connection
                socket.emit("message", message);
            });
        });
    }
    Start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}.`);
    }
}
new Server(port).Start();
//# sourceMappingURL=server.js.map