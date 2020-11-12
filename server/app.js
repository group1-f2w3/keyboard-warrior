const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let playerStatus = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  //user login
  socket.on('userLogin', (username) => {
    playerStatus.push({
      username: username,
      hp: 100
    });

    io.emit('userLogin', playerStatus);
  });

  socket.on('sendAtteck', (attack) => {
    playerStatus.forEach((elemen) => {
      if (elemen.username !== attack.username) {
        elemen.hp -= 10;
      }
    });

    io.emit('sendAttack', playerStatus);
  });
});

http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
