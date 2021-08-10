//import { Socket } from "socket.io";
//import { io } from "socket.io-client";
class Client{
   private socket:SocketIOClient.Socket;
   constructor(){
      this.socket = io();

      this.socket.on('message', function (message: any) {
         console.log(message)
         document.body.innerHTML = message
     })



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