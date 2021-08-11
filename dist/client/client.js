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
        this.socket.on('message', (message) => {
            console.log(message);
            document.body.innerHTML += message + '<br/>';
            this.socket.emit('message', 'Thanks for having me');
        });
    }
}
const client = new Client();
//# sourceMappingURL=client.js.map