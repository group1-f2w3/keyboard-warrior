<template>
  <section class="winner-page loser-page">
      <WinnerCard/>
      <LoserCard/>
  </section>
</template>

<script>
import WinnerCard from '../components/WinnerCard.vue'
import LoserCard from '../components/LoserCard.vue'
export default {
  name: 'Result',
  data () {
    return {
      // trophy
    }
  },
  components: {
    WinnerCard,
    LoserCard
  }
}
</script>

<style>

</style>