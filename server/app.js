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

io.on('connection', (socket) => {
  console.log('a user connected')

  //user login
  socket.on('userLogin', (username) => {
    // playerStatus.push({
    //   username: username,
    //   hp: 100
    // });
    // io.emit('userLogin', playerStatus);
    socket.emit('get-rooms', rooms)
  })

  socket.on('create-room', (data) => {
    let room = {
      name: data['room-name'],
      users: [],
      admin: data.admin,
    }
    // Masukkan ke rooms
    rooms.push(room)
    // Kirimkan data rooms terbaru ke semua  client
    io.emit('updated-rooms', rooms)
  })

  socket.on('sendAttack', ({ attack, damage }) => {
    playerStatus.forEach((elemen) => {
      if (elemen.username !== attack.username) {
        //memberikan damage kepada lawan
        elemen.hp -= damage
      }
    })
    console.log(damage, 'server')
    io.emit('sendAttack', playerStatus)
  })

  socket.on('join-room', (data) => {
    socket.join(data['room-name'], () => {
      // cari index dari room-name yang diminta client
      let roomIndex = rooms.findIndex((room) => room.name === data['room-name'])
      let room = rooms[roomIndex]
      // kirim ke client yang join di room tsb data detail room-nya
      io.sockets.in(data['room-name']).emit('room-details', room)
    })
  })

  socket.on('start-game', (roomName) => {
    // kirim event agar semua pemain selain admin untuk mulai main game
    socket.broadcast.to(roomName).emit('start-game')
    //
  })
})

http.listen(port, () => {
  console.log(`listen on http://localhost:${port}`)
})
