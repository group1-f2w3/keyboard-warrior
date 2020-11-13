<template>
  <section class="welcome-page">
    <img :src="mainLogo" class="main-logo" alt="" />
    <div class="card">
      <div class="card-body justify-content-center">
        <div class="type-logo">
          <img :src="typeLogo" width="200px" alt="" />
        </div>
        <form
          @submit.prevent="login"
          class="mt-5 align-content-center"
        >
          <div class="form-group">
            <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
            />
          </div>
          <div class="d-flex justify-content-center mt-5">
            <button class="btn btn-success w-50">Play</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import mainLogo from '@/assets/main-logo.png'
  import typeLogo from '@/assets/type-logo.png'
  export default {
    name: 'Login',
    data() {
      return {
        mainLogo,
        typeLogo,
        username: '',
      }
    },
    methods: {
      login() {
        localStorage.setItem('username', this.username)
        this.$socket.emit('userLogin', { username: this.username })
        this.$router.push('/rooms')
      },
    },
  }
</script>

<style></style>
