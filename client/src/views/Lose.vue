<template>
  <section class="loser-page">
    <LoserCard />
  </section>
</template>

<script>
  import LoserCard from '../components/LoserCard.vue'
  export default {
    name: 'Result',
    data() {
      return {
        // trophy,
      }
    },
    components: {
      LoserCard,
    },
  }
</script>

<style></style>
