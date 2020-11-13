<template>
  <div class="card card-winner">
        <div class="card-body">
          <img :src="trophy" width="250px" class="mr-4 mb-3 trophy" alt="">
          <h3 class="text-result">You're the Champion!</h3>
          <p class="text-result">Username</p>
          <div class="btn-section">
          <button class="btn btn-success" @click="gotoLogin">Play Again</button>
          </div>
        </div>
      </div>
</template>

<script>
import trophy from '@/assets/trophy.png'
export default {
  name: 'WinnerCard',
  data () {
    return {
      trophy
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style scoped>
  .card-winner {
    background: transparent;
  }
  .text-result {
    color: white
  }
</style>