<template>
  <div class="card card-winner">
        <div class="card-body">
          <img :src="trophy" width="250px" class="mr-4 mb-3 trophy" alt="">
          <h3>You're the champions</h3>
          <p>Username</p>
          <div class="btn-section">
          <button class="btn btn-success">Play Again</button>
          <button class="btn btn-danger">Exit</button>
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
  }
}
</script>

<style>

</style>