class Client {
    constructor() {
        this.scrollChatWindow = () => {
            $('#messages').animate({
                scrollTop: $('#messages li:last-child').position().top,
            }, 500);
            setTimeout(() => {
                let messagesLength = $('#messages li');
                if (messagesLength.length > 10) {
                    messagesLength.eq(0).remove();
                }
            }, 500);
        };
        this.socket = io();
        this.socket.on('connect', function () {
            console.log('connect');
        });
        this.socket.on('disconnect', function (message) {
            console.log('disconnect ' + message);
            //location.reload();
        });
        this.socket.on('chatMessage', (chatMessage) => {
            $('#messages').append("<li><span class='float-right'><span class='circle'>" +
                chatMessage.from +
                "</span></span><div class='otherMessage'>" +
                chatMessage.message +
                '</div></li>');
            this.scrollChatWindow();
        });
    }
    sendMessage() {
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: 'AB',
            });
            $('#messages').append("<li><span class='float-left'><span class='circle'>AB</span></span><div class='myMessage'>" +
                messageText +
                '</div></li>');
            this.scrollChatWindow();
            $('#messageText').val('');
        }
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map