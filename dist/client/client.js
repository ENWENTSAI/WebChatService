"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require("qs");
class Client {
    constructor() {
        this.socket = io();
        const date = new Date();
        let name = $('#username').val();
        //const inputValue = (<HTMLInputElement>document.getElementById('username')).value;
        // Get username and room from URL
        const { username, room } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        console.log(username);
        //console.log(inputValue);
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
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
        });
    }
    sendMessage() {
        const date = new Date();
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: "Default",
            });
            $('#chat-message-list').append("<div id='message-row you-message' class='message-row you-message'>" +
                "<div class='message-content'>" +
                "<div class='message-text'>" + messageText + "</div>" +
                "<div class='message-time'>" + `${date.getHours()}:${date.getMinutes()}` + "</div>" + " </div> " + " </div> ");
            $('#messageText').val('');
        }
    }
    join() {
        let username = $('#username').val();
        let room = $('#room').val();
        console.log(username + " " + room);
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map