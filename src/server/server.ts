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
    //app.use(express.static(path.join(__dirname,'public/dist')));
    app.use(express.static('public'));
    //app.use(express.static('dist'));
    //app.use('/jquery',express.static(path.join(__dirname, '../../node_modules/jquery/dist')));


    this.server=new http.Server(app);
    this.io = new socketIO.Server(this.server);

    //server不能直接讀url 想想如何讓server取得username & room
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const username = urlParams.get('username')
    // const room = urlParams.get('room')

    this.io.on('connection', (socket: socketIO.Socket) => {
      console.log('a user connected : ' + socket.id)

      //
    //   socket.broadcast.to(room).emit(
    //     'message',
    //     username + 'Joined '+ room
      
    // )
        // Broadcast when a user connects
        // socket.broadcast
        // .to(user.room)
        // .emit(
        //   'message',
        //   formatMessage(botName, `${user.username} has joined the chat`)
        // );
      
      socket.on('disconnect', () => {
          console.log( socket.id + 'has left') ;
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
