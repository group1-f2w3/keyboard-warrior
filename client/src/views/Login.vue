<template>
  <div>
    <h1>Login</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    login () {
      localStorage.setItem('username', this.username);
      this.$socket.emit('userLogin', this.username);
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style>

</style>