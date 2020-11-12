<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Typing />
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import Typing from '@/components/Typing.vue'

export default {
  name: 'Home',
  data () {
    return {
      playerStatus: [],
      username: '',
      attack: ''
    }
  },
  methods: {
    sendAttack () {
      let attacks = {
        username: localStorage.getItem('username')
        attack: this.attack
      }
      this.$socket.emit('sendAttack', attacks)
      this.attack = ''
    }
  },
  sockets: {
    userLogin (playerStatus) {
      this.username = localStorage.getItem('username')
      this.playerStatus = playerStatus
    },
    sendAttack (playerStatus) {
      this.playerStatus = playerStatus
    }
  },
  components: {
    HelloWorld,
    Typing
  }
}
</script>
