//import { Socket } from "socket.io";
import { io } from "socket.io-client";
class Client{
   constructor(){
    const socket = io("http://localhost:8080",{transports :  ['websocket', 'polling', 'flashsocket'] });

     socket.emit("message")
   }
}

const client = new Client();