class Client {
    constructor() {
        this.socket = io();
        this.socket.on('connect', function () {
            console.log('connect');
        });
        this.socket.on('disconnect', function (message) {
            console.log('disconnect ' + message);
            //location.reload();
        });
        this.socket.on('chatMessage', (chatMessage) => {
            $('#chat-message-list').append(// message
            "<div id='message-row other-message' class='message-row other-message'>" +
                "<div class='message-content'>" +
                "<div class='name'>" + chatMessage.from + "</div>" +
                "<div class='message-text'>" + chatMessage.message + "</div>" +
                "<div class='message-time'>" + "Apr 16" + "</div>" + " </div> " + " </div> ");
        });
    }
    sendMessage() {
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: "Default",
            });
            $('#chat-message-list').append("<div id='message-row you-message' class='message-row you-message'>" +
                "<div class='message-content'>" +
                "<div class='message-text'>" + messageText + "</div>" +
                "<div class='message-time'>" + "Apr 16" + "</div>" + " </div> " + " </div> ");
            $('#messageText').val('');
        }
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map