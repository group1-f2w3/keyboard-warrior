<template>
  <div class="card card-loser">
      <div class="card-body">
        <img :src="medal" width="170px" class="mr-1 mb-3 trophy" alt="">
        <h3 class="text-result">You lose, train harder!</h3>
        <p class="text-result">Username</p>
        <div class="btn-section">
          <button class="btn btn-success" @click="gotoLogin">Play Again</button>
          <!-- <button class="btn btn-danger">Exit</button> -->
        </div>
      </div>
    </div>
</template>

<script>
import medal from '@/assets/medal.png'
export default {
  name: 'LoserCard',
  data () {
    return {
      medal
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
  .card-loser {
    background: transparent;
  }
  .text-result {
    color: white
  }
</style>