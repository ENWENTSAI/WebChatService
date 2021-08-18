//get username & room name from URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username')
const room = urlParams.get('room');

class Client{
    
   private socket:SocketIOClient.Socket;
   constructor(){
    this.socket = io();
    this.socket.on('connect', function () {

        // add the chatroom title to DOM
         $('#chat-title').append(
            "<span id='roomtitle'>"+
            room + 
            "</span>"
            );
        // add welcome message to DOM
        $('#chat-message-list').append( 
            "<div class='official-text'>" +username+", welcome to join room - "+room+
            "</div>"
            ); 
    });

    //sending (username & room) value to server side for join & left function
    this.socket.emit('joinRoom',room,username);
    this.socket.emit('LeftRoom',room,username);

    // receive message from server 
    this.socket.on('message', function (message: any) {
       $('#chat-message-list').append( 
           "<div class='official-text'>" +message+
           "</div>"
           );
    });

    //disconnect with server side
    this.socket.on('disconnect', function (message: any) {
        console.log('disconnect ' + message)
        location.reload();
    });

    // receive messages from room members 
    this.socket.on('chatMessage', (chatMessage: ChatMessage) => {
        const date = new Date();
        $('#chat-message-list').append( // message
            "<div id='message-row other-message' class='message-row other-message'>"+
            "<div class='message-content'>" + 
            "<div class='name'>" + chatMessage.from + "</div>" + 
            "<div class='message-text'>" + chatMessage.message+"</div>"+
            "<div class='message-time'>"+`${date.getHours()}:${date.getMinutes()}`+
            "</div>"+" </div> "+" </div> "
        );
    });
}

//sending messages from your side
public sendMessage() {
    const date = new Date();
    let messageText = $('#messageText').val()
    if (messageText.toString().length > 0) {
        this.socket.emit('chatMessage', <ChatMessage>{
            message: messageText,
            from: username,
        });
        $('#chat-message-list').append(
            "<div id='message-row you-message' class='message-row you-message'>"+
            "<div class='message-content'>" + 
            "<div class='message-text'>" + messageText+"</div>"+
            "<div class='message-time'>"+`${date.getHours()}:${date.getMinutes()}` +"</div>"+" </div> "+" </div> "
        );
        // clear your input value
        $('#messageText').val('');
    }

}
}

const client = new Client();