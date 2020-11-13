<template> </template>

<script>
  export default {
    data() {
      return {
        rooms: [], //  -> isinya: { name: '', users: [], admin: '' }
        roomName: '',
      }
    },

    created() {
      socket.on('get-rooms', (data) => {
        this.rooms = data
      })

      socket.on('updated-rooms', (data) => {
        this.rooms = data
      })
    },

    methods: {
      createRoom() {
        let payload = {
          'room-name': this.roomName,
          admin: localstorage.getItem('username'), // pemain yg create room-lah yg jadi adminnya
        }
        // Minta dibikinin room ke server
        socket.emit('create-room', payload)
        this.roomName = '' // kosongin form input
      },

      joinRoom(name) {
        let payload = {
          'room-name': name,
          username: localStorage.username,
        }
        // kirim ke server bahwa kita join suatu room
        socket.emit('join-room', payload)
        // pindah ke lobby room tsb
        this.$router.push(`/lobby/${name}`)
      },
    },
  }
</script>

<style></style>
