//import { Socket } from "socket.io";
import { io } from "socket.io-client";
class Client{
   constructor(){
     
    
     const socket = io();
     socket.emit("message")
   }
}

const client = new Client();