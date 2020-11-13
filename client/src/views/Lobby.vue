<template>
  <div>
    <h1>
      Lobby <strong>{{ room.name }}</strong>
    </h1>

    <h3>Waiting for host to start the game</h3>
    <button v-if="username === room.admin" @click="start">Start Game</button>
    <h3>Players List</h3>
    <div id="card-user-container">
      <div v-for="(user, i) in room.users" :key="i" id="card-user">
        <div>{{ user }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        room: {},
        adminName: '',
      }
    },

    created() {
      console.log('masuk lobby')
      this.username = localStorage.getItem('username')
    },

    sockets: {
      roomDetails(room) {
        this.room = room
      },

      startGame() {
        this.$router.push(`/play/${this.room.name}`)
      },
    },

    methods: {
      start() {
        socket.emit('startGame', this.room.name)
        // pindah ke halaman play
        this.$router.push(`/play/$(this.room.name)`)
      },
    },
  }
</script>

<style>
  #card-user-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  #card-user {
    padding: 2rem;
    margin-right: 1rem;
    width: 200px;
    border-radius: 6px;
    background-color: aliceblue;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.35);
  }
</style>
