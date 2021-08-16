"use strict";
//const userlist = [] as any;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.userJoin = void 0;
const userlist = [];
function userJoin({ id, username, room }) {
    const user = { id, username, room };
    //  const existingUser = userlist.find((user) => user.room === room && user.username === username);
    //  if(existingUser) return { error: 'Username is taken.' };
    return user;
}
exports.userJoin = userJoin;
// module.exports = {
//   userJoin,
// };
// Get online user
function getUser(id) {
    return userlist.find(user => user.id === id);
}
exports.getUser = getUser;
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
//# sourceMappingURL=users.js.map