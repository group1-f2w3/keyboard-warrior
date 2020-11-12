<template>
  <div class="card card-loser">
      <div class="card-body">
        <img :src="medal" width="170px" class="mr-1 mb-3 trophy" alt="">
        <h3>You lose, train more hard</h3>
        <p>Username</p>
        <div class="btn-section">
          <button class="btn btn-success">Play Again</button>
          <button class="btn btn-danger">Exit</button>
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
  }
}
</script>

<style>

</style>