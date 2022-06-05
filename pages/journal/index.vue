<template>

  <div>
    <a-skeleton active />

    <journalCard />
  </div>
</template>

<script>
import journalCard from '@/components/card/journalCard.vue'
export default {
  layout: 'defaut',
  components: {
    journalCard,
  },
}
</script>

<style>
</style>