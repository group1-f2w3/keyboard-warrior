<template>
  <div class="rooms-page">
    <h1 class="title">Rooms</h1>

    <button class="btn btn-success mb-3" v-if="!showForm" @click="showForm = true">Create Room</button>
    <form v-else @submit.prevent="createRoom">
      <label for="room" class="text-white mr-3">Room Name</label>
      <input v-model="roomName" type="text" name="room" class="mr-3 rounded" required/>
      <button class="btn btn-success">Create Room</button>
    </form>

    <div v-if="rooms.length === 0">
      No room available. Please create one.
    </div>

    <div v-else id="card-room-container">
      <div id="card-room" v-for="(room, i) in rooms" :key="i">
        <h3>{{ room.name }}</h3>
        <p>Host: {{ room.admin }}</p>
        <button @click="joinRoom(room.name)" v-if="room.admin !== username">
          Join Room
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    username: '',
    name: 'Room',
    data() {
      return {
        rooms: [], //  -> isinya: { name: '', users: [], admin: '' }
        roomName: '',
        showForm: false,
      }
    },

    created() {
      console.log('masuk room')
      this.$socket.emit('getRooms')
      this.username = localStorage.getItem('username')
    },

    sockets: {
      getRooms(rooms) {
        console.log(rooms, '<<<< get rooms')
        this.rooms = rooms
      },

      updatedRooms(rooms) {
        console.log(rooms, '<<<< updated rooms')

        this.rooms = rooms
      },

      roomUnavailable() {
        alert('Room unavailable, please choose another name')
      },
    },

    methods: {
      createRoom() {
        console.log('create room:', this.roomName)
        let payload = {
          roomName: this.roomName,
          admin: localStorage.getItem('username'), // pemain yg create room-lah yg jadi adminnya
        }
        // Minta dibikinin room ke server
        this.$socket.emit('createRoom', payload)
        this.roomName = '' // kosongin form input
        this.showForm = false
      },

      joinRoom(name) {
        console.log('join room:', name)
        let payload = {
          roomName: name,
          username: localStorage.username,
        }
        // kirim ke server bahwa kita join suatu room
        this.$socket.emit('joinRoom', payload)
        // pindah ke lobby room tsb
        this.$router.push(`/lobby/${name}`)
      },
    },
  }
</script>

<style>
  #card-room-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #card-room {
    padding: 2rem;
    margin-right: 1rem;
    width: 200px;
    border-radius: 6px;
    background-color: aliceblue;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.35);
  }
</style>
