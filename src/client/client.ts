
class Client{
   private socket:SocketIOClient.Socket;
   constructor(){
      this.socket = io();

      this.socket.on('connect', function () {
         console.log('connect')
     })

     this.socket.on('disconnect', function (message: any) {
         console.log('disconnect ' + message)
         //location.reload();
     })

     this.socket.on('message', (message: any) => {
      console.log(message)
      document.body.innerHTML += message + '<br/>'
      this.socket.emit('message', 'Thanks for having me')
  })
}

}

const client = new Client();