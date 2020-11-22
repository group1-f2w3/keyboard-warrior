const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let rooms = []
let playerStatus = []
let maxHp = 50
let newWord = ''
let isPlaying = false

let words = require('./kamus')

function sendNewWord() {
  if (isPlaying) {
    let randomIndex = Math.floor(Math.random() * words.length)
    newWord = words[randomIndex]
    console.log('sending new word:', newWord)
    io.emit('fetchWord', newWord)
  }
}

io.on('connection', (socket) => {
  console.log('a user connected')

  //user login
  // socket.on('userLogin', (username) => {
  //   // playerStatus.push({
  //   //   username: username,
  //   //   hp: 100
  //   // });
  //   // io.emit('userLogin', playerStatus);
  //   socket.emit('getRooms', rooms)
  // })

  socket.on('fetchWord', () => {
    sendNewWord()
  })

  socket.on('playerStatus', () => {
    io.emit('playerStatus', playerStatus)
  })

  socket.on('sendAttack', (data) => {
    playerStatus.forEach((player) => {
      if (player.username !== data.username) {
        // player.hp = player.hp - data.damage
        console.log('send attack:', { newWord, length: newWord.length })
        player.hp = player.hp - newWord.length
      }
    })

    playerStatus.forEach((player) => {
      if (player.hp <= 0) {
        isPlaying = false
        player.hp = 0

        // kosongkan data player
        playerStatus = []

        io.emit('finish', playerStatus)
      }
    })
    io.emit('playerStatus', playerStatus)

    sendNewWord()
    // damages.push(dps)
    // io.emit('sendAttack', damages)
  })

  socket.on('getRooms', () => {
    socket.emit('getRooms', rooms)
  })

  socket.on('createRoom', (data) => {
    if (rooms.findIndex((room) => room.name === data.roomName) !== -1) {
      socket.emit('roomUnavailable')
    } else {
      let room = {
        name: data.roomName,
        users: [],
        admin: data.admin,
      }

      // Masukkan ke rooms
      rooms.push(room)
      // Kirimkan data rooms terbaru ke semua  client
      io.emit('updatedRooms', rooms)
    }
  })
  // socket.on('userLogin', ({username,hp}) => {
  //   playerStatus.push(hp)
  //   onlineUsers.push(username)
  //   //broadcasting playerinfo
  //   io.emit('userLogin', {onlineUsers,playerStatus});
  // });

  // socket.on('sendAttack', ({ attack, damage }) => {
  //   playerStatus.forEach((elemen) => {
  //     if (elemen.username !== attack.username) {
  //       //memberikan damage kepada lawan
  //       elemen.hp -= damage
  //     }
  //   })
  //   console.log(damage, 'server')
  //   io.emit('sendAttack', playerStatus)
  // })

  socket.on('joinRoom', (data) => {
    socket.join(data.roomName, () => {
      // cari index dari room-name yang diminta client
      let roomIndex = rooms.findIndex((room) => room.name === data.roomName)
      let room = rooms[roomIndex]
      // kirim ke client yang join di room tsb data detail room-nya
      io.sockets.in(data.roomName).emit('roomDetails', room)
    })
  })

  socket.on('startGame', (roomName) => {
    // kirim event agar semua pemain selain admin untuk mulai main game
    socket.broadcast.to(roomName).emit('startGame')
    //
  })

  socket.on('userLogin', ({ username }) => {
    if (playerStatus.length > 1) {
      console.log(playerStatus)
      console.log(playerStatus.length)
      io.emit('fullArena')
    } else {
      playerStatus.push({ username, hp: maxHp, maxHp })

      socket.emit('enterArena')
      //broadcasting playerinfo
      io.emit('playerStatus', playerStatus)
    }
  })
})
console.log(playerStatus)
http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`)
})
