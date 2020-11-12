<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

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
      this.$socket.emit('sendAttack', this.attack)
      this.attack = ''
    }
  },
  sockets: {
    userLogin (playerStatus) {
      this.username = localStorage.getItem('username')
      this.playerStatus = playerStatus
    }
  },
  components: {
    HelloWorld
  }
}
</script>
