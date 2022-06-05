<template>
  <div class="sign">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'sign',
}
</script>

<style scoped>
.sign {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.sign .title {
  background-color: #ccc;
}
</style>
