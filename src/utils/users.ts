
//const userlist = [] as any;

const userlist : Array<any> = [];

export function userJoin({id,username,room}:user) {
  const user = { id, username, room };
  //  const existingUser = userlist.find((user) => user.room === room && user.username === username);
  //  if(existingUser) return { error: 'Username is taken.' };
  return user;
}

// module.exports = {
//   userJoin,
// };


// Get online user
export function getUser(id:string) {
  return userlist.find(user => user.id === id);
}

// // User leaves chat room
// export function userLeave(id:string) {
//   const index = userlist.findIndex(user => user.id === id);

//   if (index !== -1) {
//     return userlist.splice(index, 1)[0];
//   }
// }

// // Get room users
// export function getRoomUsers(room:string) {
//   return userlist.filter(user => user.room === room);
// }