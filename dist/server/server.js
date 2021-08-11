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
        //app.use(express.static(path.join(__dirname, '../dist/client')))
        app.use(express.static('dist'));
        // app.get("/", (req: any, res: any) => {
        //   res.sendFile(path.resolve("./dist/chat.html"));
        // }); //
        this.server = new http.Server(app);
        this.io = new socketIO.Server(this.server);
        this.io.on('connection', (socket) => {
            console.log('a user connected : ' + socket.id);
            //   socket.emit("message","hello " + socket.id);
            //   socket.broadcast.emit(
            //     'message',
            //     'Everybody, say hello to ' + socket.id
            // )
            socket.on('disconnect', () => {
                console.log('socket disconnected : ' + socket.id);
            });
            //   socket.on('message', function (message: any) {
            //     console.log(message)
            // });
            //   socket.on('chatMessage', function (chatMessage: ChatMessage) {
            //     socket.broadcast.emit('chatMessage', chatMessage)
            // })
        });
    }
    Start() {
        this.server.listen(this.port);
        console.log(`Server listening on port ${this.port}.`);
    }
}
new Server(port).Start();
//# sourceMappingURL=server.js.map