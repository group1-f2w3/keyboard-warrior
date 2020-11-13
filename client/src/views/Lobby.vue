<template> </template>

<script>
  export default {
    data() {
      return {
        room: {},
        adminName: '',
      }
    },

    created() {
      socket.on('room-details', (data) => {
        this.room = data
      })
      this.adminName = localStorage.username

      socket.on('start-game', () => {
        this.$router.push(`/play/${this.room.name}`)
      })
    },

    methods: {
      start() {
        socket.emit('start-game', this.room.name)
        // pindah ke halaman play
        this.$router.push(`/play/$(this.room.name)`)
      },
    },
  }
</script>

<style></style>
