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

  socket.on('sendAttack', ({attack,damage}) => {
    playerStatus.forEach((elemen) => {
      if (elemen.username !== attack.username) {
        //memberikan damage kepada lawan
        elemen.hp -= damage;
      }
    });
    console.log(damage,'server')
    io.emit('sendAttack', playerStatus);
  });
});

http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
