//get username & room name from URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const room = urlParams.get('room');
class Client {
    constructor() {
        this.socket = io();
        this.socket.on('connect', function () {
            // add the chatroom title to DOM
            $('#chat-title').append("<span id='roomtitle'>" +
                room +
                "</span>");
            //  if(username!= null){
            //     $('#room-user').append(
            //         "<div class ='friend'>"+
            //         username + 
            //         "</div>"
            //     )
            // }
        });
        //sending (username & room) to server side
        this.socket.emit('joinRoom', room, username);
        this.socket.emit('LeftRoom', room, username);
        // receive message from server 
        this.socket.on('message', function (message) {
            const date = new Date();
            $('#chat-message-list').append(// message
            "<div id='message-row other-message' class='message-row other-message'>" +
                "<div class='message-content'>" +
                "<div class='name'>" + "Bot" + "</div>" +
                "<div class='message-text'>" + message + "</div>" +
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
        });
        //disconnect with server side
        this.socket.on('disconnect', function (message) {
            console.log('disconnect ' + message);
            location.reload();
        });
        // receive messages from room member 
        this.socket.on('chatMessage', (chatMessage) => {
            const date = new Date();
            $('#chat-message-list').append(// message
            "<div id='message-row other-message' class='message-row other-message'>" +
                "<div class='message-content'>" +
                "<div class='name'>" + chatMessage.from + "</div>" +
                "<div class='message-text'>" + chatMessage.message + "</div>" +
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
        });
    }
    //sending messages from your side
    sendMessage() {
        const date = new Date();
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: username,
            });
            $('#chat-message-list').append("<div id='message-row you-message' class='message-row you-message'>" +
                "<div class='message-content'>" +
                "<div class='message-text'>" + messageText + "</div>" +
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
            // clear your input value
            $('#messageText').val('');
        }
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map