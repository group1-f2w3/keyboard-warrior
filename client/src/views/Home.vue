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
    data() {
      return {
        playerStatus: [],
      }
    },
    sockets: {
      userLogin(playerStatus) {
        this.playerStatus = playerStatus
      },
    },
    components: {
      HelloWorld,
      Typing,
    },
  }
</script>
