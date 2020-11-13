<template>
  <section class="arena-page">
      <div class="card card-arena">
        <div class="container">
          <div class="row">
            <div class="col">
              <h3 class="text-white">health bar player 1</h3>
              <div id="myProgress1">
                <div id="myBar1"></div>
              </div>
            </div>
            <div class="col">
              <h3 class="text-white">health bar player 2</h3>
              <div id="myProgress2">
                <div id="myBar2"></div>
              </div>
            </div>
          </div>
          <div class="row d-flex mt-5">
              <img :src="knight" width="50%" alt="" srcset="">
              <img :src="knightEnemy" width="50%" alt="" srcset="">
          </div>
        </div>
      </div>
      <!-- TYPE CONTAINER -->
      <div class="card card-type p-3 mt-3">
        <h1 class="display-5 ">
          TYPE
        </h1>
      </div>
    </section>
</template>

<script>
import knight from '@/assets/knight-a-idle.gif'
import knightEnemy from '@/assets/knight-b-idle.gif'
export default {
  name: 'Arena',
  data () {
    return {
      knight,
      knightEnemy
    }
  }
}
</script>

<style>

</style>