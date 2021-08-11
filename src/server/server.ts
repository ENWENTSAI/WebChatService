import * as express from "express"
import * as path from "path"
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
    //app.use(express.static(path.join(__dirname, '../dist/client')))

    app.use(express.static('dist'));
    app.use(
      '/jquery',
      express.static(
          path.join(__dirname, '../../node_modules/jquery/dist')
      )
  )
    // app.get("/", (req: any, res: any) => {
    //   res.sendFile(path.resolve("./dist/chat.html"));
      
    // }); //
    
    this.server=new http.Server(app);
    this.io = new socketIO.Server(this.server);
    this.io.on('connection', (socket: socketIO.Socket) => {
      console.log('a user connected : ' + socket.id)
      
      socket.on('disconnect', () => {
          console.log('socket disconnected : ' + socket.id);
      });

      socket.on('chatMessage', function (chatMessage: ChatMessage) {
        console.log('chatMessage', chatMessage);
        socket.broadcast.emit('chatMessage', chatMessage)
    })

  })

  }
  public Start() {
    this.server.listen(this.port)
    console.log(`Server listening on port ${this.port}.`)
}

}

new Server(port).Start()
