//import { Socket } from "socket.io";
//import { io } from "socket.io-client";
class Client {
    constructor() {
        this.socket = io();
        //const socket = io("http://localhost:8080",{transports :  ['websocket', 'polling', 'flashsocket'] });
        //    socket.on("connect", function(){
        //       console.log("connect");
        //    })
        //    socket.on("disconnect", function (message: any) {
        //       console.log("disconnect " + message);
        //   })
        //    socket.emit("message")
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map