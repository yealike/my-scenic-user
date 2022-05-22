<template>
  <div>
    <nuxt-link to="/scenic/1">详情页</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default',
  name: "index",
  methods: {
    toDetails() {
      this.$router.push({path: '~/pages/scenic/_id'})
    }
  }
}
</script>

<style scoped>

</style>
