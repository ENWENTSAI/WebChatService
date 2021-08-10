//import { Socket } from "socket.io";
import { io } from "socket.io-client";
class Client{
   constructor(){
    
     console.log("try ");
     const socket = io();
   }
}

const client = new Client();