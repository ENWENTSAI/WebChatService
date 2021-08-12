"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const port = 4000;
class Server {
    constructor(port) {
        this.port = port;
        const app = express();
        //app.use(express.static(path.join(__dirname, '../dist/client')))
        app.use(express.static('dist'));
        app.use('/jquery', express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
        // app.get("/", (req: any, res: any) => {
        //   res.sendFile(path.resolve("./dist/chat.html"));
        // }); //
        this.server = new http.Server(app);
        this.io = new socketIO.Server(this.server);
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            //
            socket.broadcast.emit('message', socket.id + 'Joined the Chat Room');
            socket.on('disconnect', () => {
                console.log(socket.id + 'has left');
            });
            socket.on('chatMessage', function (chatMessage) {
                console.log('chatMessage', chatMessage);
                socket.broadcast.emit('chatMessage', chatMessage);
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