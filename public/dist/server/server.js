"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const userlist = [];
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
            // //broadcast welcome message from service
            // socket.broadcast.emit('welcome', "Welcome !!!!! ");
            // listening the socket for getting the room & username from client side
            socket.on('joinRoom', function (room, username) {
                // use join function to join the specific room
                socket.join(room);
                //broadcast the message who joined this specific room.
                socket.broadcast.to(room).emit('message', " Everybody, say hello to  " + username);
                // console.log(userlist);
                // socket.to(room).emit('userlist',userlist);
                //sending chat message to who are in the same room. 
                socket.on('chatMessage', function (chatMessage) {
                    console.log('chatMessage', chatMessage);
                    socket.broadcast.to(room).emit('chatMessage', chatMessage);
                });
            });
            // getting the room & username from client side for disconnect message
            socket.on('LeftRoom', function (room, username) {
                socket.join(room);
                socket.on('disconnect', () => {
                    console.log(socket.id + ' has left');
                    socket.broadcast.to(room).emit('message', username + " has left ");
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