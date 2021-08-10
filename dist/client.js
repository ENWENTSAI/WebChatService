"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { Socket } from "socket.io";
const socket_io_client_1 = require("socket.io-client");
class Client {
    constructor() {
        const socket = socket_io_client_1.io();
        socket.emit("message");
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map