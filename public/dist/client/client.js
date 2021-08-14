const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
class Client {
    constructor() {
        this.socket = io();
        const date = new Date();
        // Get username and room from URL
        // const { username, room } = qs.parse(location.search, {
        // ignoreQueryPrefix: true,
        //  });
        this.socket.on('connect', function () {
            console.log('connect');
            if (username != null) {
                $('#room-user').append("<div class ='friend'>" +
                    username +
                    "</div>");
            }
        });
        this.socket.on('disconnect', function (message) {
            console.log('disconnect ' + message);
            //location.reload();
        });
        // receive message from others
        this.socket.on('chatMessage', (chatMessage) => {
            $('#chat-message-list').append(// message
            "<div id='message-row other-message' class='message-row other-message'>" +
                "<div class='message-content'>" +
                "<div class='name'>" + chatMessage.from + "</div>" +
                "<div class='message-text'>" + chatMessage.message + "</div>" +
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
        });
    }
    //send messages
    sendMessage() {
        const date = new Date();
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const username = urlParams.get('username')
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
            $('#messageText').val('');
        }
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map