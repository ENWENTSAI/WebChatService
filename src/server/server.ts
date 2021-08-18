import * as express from "express"
import * as http from "http"
import * as socketIO from "socket.io"

const port : number = 4000;

class Server{

  private server:http.Server;
  private port: number;
  private io: socketIO.Server;

  constructor(port: number){
    this.port=port;

    const app =express();
    app.use(express.static('public'));

    this.server=new http.Server(app);
    this.io = new socketIO.Server(this.server);

    
    this.io.on('connection', (socket: socketIO.Socket) => {
      
      console.log('a user connected : ' + socket.id)
      
      // get the room & username value from client side
      socket.on('joinRoom', function (room: string,username:string) {
        
        // use join function to join the specific room
        socket.join(room);

        //broadcast the message who joined this specific room.
        socket.broadcast.to(room).emit('message'," Everybody, say hello to  " + username);


        //sending messages to this specific room. 
        socket.on('chatMessage', function (chatMessage: ChatMessage) {
          console.log('chatMessage', chatMessage);
          socket.broadcast.to(room).emit('chatMessage', chatMessage);
        });
      
      });
    
    
      //getting the room & username from client side for disconnect message
      socket.on('LeftRoom', function (room: string,username:string) {
        socket.join(room);

        socket.on('disconnect', () => {
          console.log(socket.id + ' has left');
          socket.broadcast.to(room).emit('message',username + " has left ");
        });

      });

     });

  }
  public Start() {
    this.server.listen(this.port)
    console.log(`Server listening on port ${this.port}.`)
  }

}

new Server(port).Start()

