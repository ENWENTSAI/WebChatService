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
            // get the room & username value from client side
            socket.on('joinRoom', function (room, username) {
                // use join function to join the specific room
                socket.join(room);
                //broadcast the message who joined this specific room.
                socket.to(room).emit('message', " Everybody, say hello to  " + username);
                //sending messages to this specific room. 
                socket.on('chatMessage', function (chatMessage) {
                    console.log('chatMessage', chatMessage);
                    socket.to(room).emit('chatMessage', chatMessage);
                });
            });
            //getting the room & username from client side for disconnect message
            socket.on('LeftRoom', function (room, username) {
                socket.join(room);
                socket.on('disconnect', () => {
                    console.log(socket.id + ' has left');
                    socket.to(room).emit('message', username + " has left ");
                });
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