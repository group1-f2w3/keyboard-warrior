<template>
  <section class="welcome-page">
    <img :src="mainLogo" class="main-logo" alt="" />
    <div class="card">
      <div class="card-body justify-content-center">
        <div class="type-logo">
          <img :src="typeLogo" width="200px" alt="" />
        </div>
        <form class="mt-5 align-content-center">
          <div class="form-group">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
            />
          </div>
          <div class="d-flex justify-content-center mt-5">
            <button @click.prevent="login" class="btn btn-success w-50">
              Play
            </button>
          </div>
          <div v-if="fullArena" style="color: red">
            Arena is full, please wait
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import mainLogo from '@/assets/main-logo.png'
  import typeLogo from '@/assets/type-logo.png'
  // export default {
  //   name: 'Welcome',
  //   data() {
  //     return {
  //       mainLogo,
  //       typeLogo,
  //       username: '',
  //     }
  //   }
  export default {
    name: 'Welcome',
    data() {
      return {
        mainLogo,
        typeLogo,
        username: '',
        // hp: 100,
        fullArena: false,
      }
    },
    sockets: {
      enterArena() {
        this.fullArena = false
        localStorage.setItem('username', this.username)
        this.$router.push({ name: 'Arena' })
      },

      fullArena() {
        this.fullArena = true
      },
    },
    methods: {
      login() {
        // localStorage.setItem('hp', this.hp)
        this.$socket.emit('userLogin', { username: this.username })
      },
    },
  }
</script>

<style></style>
