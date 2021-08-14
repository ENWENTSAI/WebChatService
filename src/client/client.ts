const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username')

class Client{
    

   private socket:SocketIOClient.Socket;
   constructor(){
    this.socket = io();
    const date = new Date();

    // Get username and room from URL
    // const { username, room } = qs.parse(location.search, {
    // ignoreQueryPrefix: true,
    //  });
    this.socket.on('connect', function () {
         console.log('connect')
         if(username!= null){
            $('#room-user').append(
                "<div class ='friend'>"+
                username + 
                "</div>"
            )
        }
        


     })

    this.socket.on('disconnect', function (message: any) {
         console.log('disconnect ' + message)
         //location.reload();
     })
     // receive message from others
    this.socket.on('chatMessage', (chatMessage: ChatMessage) => {
        $('#chat-message-list').append( // message
            "<div id='message-row other-message' class='message-row other-message'>"+
            "<div class='message-content'>" + 
            "<div class='name'>" + chatMessage.from + "</div>" + 
            "<div class='message-text'>" + chatMessage.message+"</div>"+
            "<div class='message-time'>"+`${date.getHours()}:${date.getMinutes()}`+"</div>"+" </div> "+" </div> "
        )
    })

}

//send messages
public sendMessage() {
    const date = new Date();
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const username = urlParams.get('username')
    let messageText = $('#messageText').val()
    if (messageText.toString().length > 0) {
        this.socket.emit('chatMessage', <ChatMessage>{
            message: messageText,
            from: username,
        })
        $('#chat-message-list').append(
            "<div id='message-row you-message' class='message-row you-message'>"+
            "<div class='message-content'>" + 
            "<div class='message-text'>" + messageText+"</div>"+
            "<div class='message-time'>"+`${date.getHours()}:${date.getMinutes()}` +"</div>"+" </div> "+" </div> "
        )
        $('#messageText').val('')
    }

}
// public userList(){
//     if(username!= null){
//         $('#room-user').append(
//             "<div class ='friend'>"+
//             username + 
//             "</div>"
//         )
//     }
// }




// // Add room name to DOM
// function outputRoomName(room) {
//     roomName.innerText = room;
//   }
  
//   // Add users to DOM
//   function outputUsers(users) {
//     userList.innerHTML = '';
//     users.forEach((user) => {
//       const li = document.createElement('li');
//       li.innerText = user.username;
//       userList.appendChild(li);
//     });
//   }





}

const client = new Client();