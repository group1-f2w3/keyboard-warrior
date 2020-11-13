<template>
  <section class="winner-page loser-page">
    <WinnerCard />
  </section>
</template>

<script>
  import WinnerCard from '../components/WinnerCard.vue'
  export default {
    name: 'Result',
    data() {
      return {
        // trophy,
      }
    },
    components: {
      WinnerCard,
    }
  }
</script>

<style></style>
