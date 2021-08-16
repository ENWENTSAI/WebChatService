"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 4000;
class Server {
    constructor(port) {
        this.port = port;
        const app = express();
        app.use(express.static('public'));
        this.server = new http.Server(app);
        this.io = new socketIO.Server(this.server);
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            // receiving the message from client side for joining the target room
            socket.on('joinRoom', function (room, username) {
                socket.join(room);
                //broadcast the message who joined the specific room 
                socket.broadcast.to(room).emit('message', username + " has joined the room - " + room);
                //
                socket.on('chatMessage', function (chatMessage) {
                    console.log('chatMessage', chatMessage);
                    socket.broadcast.to(room).emit('chatMessage', chatMessage);
                });
            });
            socket.on('disconnect', () => {
                console.log(socket.id + 'has left');
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