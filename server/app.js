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
let damages =[]
io.on('connection', (socket) => {
  console.log('a user connected');

  //user login
  socket.on('userLogin', ({username}) => {
    playerStatus.push({username,hp:100})

    //broadcasting playerinfo
    io.emit('userLogin', playerStatus);
  });

  socket.on('sendAttack', (dps) => {
    damages.push(dps)
    io.emit('sendAttack',damages)
  
  });
});
console.log(playerStatus)
http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
