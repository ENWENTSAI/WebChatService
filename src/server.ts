import * as express from "express"
import * as path from "path"
import * as http from "http"
import * as socketIO from "socket.io"

const port : number = 8080;
class Server{
  private server:http.Server;
  private port: number;
  private io: socketIO.Server;

  constructor(port: number){
    this.port=port;
    const app =express();
    app.use("/static", express.static('./static/'));
    app.get("/", (req: any, res: any) => {
      res.sendFile(path.resolve("./dist/chat.html"));
    });
    
    this.server=new http.Server(app);
    this.io = new socketIO.Server(this.server);
    this.io.on('connection', (socket: socketIO.Socket) => {
      console.log('a user connected : ' + socket.id)

      socket.on('disconnect', () => {
          console.log('socket disconnected : ' + socket.id);
      });
      this.io.on("new_message", function(message: any) {

        // console.log("message from Client"+message);
        // // echo the message back down the
        // // websocket connection
        socket.emit("message", message);
      });

  })


  }
  
  public Start() {
    this.server.listen(this.port)
    console.log(`Server listening on port ${this.port}.`)
}

}

new Server(port).Start()
