const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let onlineUsers = []
let playerStatus = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  //user login
  socket.on('userLogin', ({username,hp}) => {
    playerStatus.push(hp)
    onlineUsers.push(username)
    //broadcasting playerinfo
    io.emit('userLogin', {onlineUsers,playerStatus});
  });

  socket.on('sendAttack', ({attack,damage}) => {
    playerStatus.forEach((elemen) => {
      if (elemen.username !== attack.username) {
        //memberikan damage kepada lawan
        elemen.hp -= damage;
      }
    });
    io.emit('sendAttack', playerStatus);
  });
});
console.log(playerStatus)
http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
