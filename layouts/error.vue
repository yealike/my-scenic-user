<template>
  <div id="error">
    <img id="error-img" src="@/assets/images/error.png" alt="" srcset="">
    <div id="message">
      <h1>{{error.statusCode}}</h1>
      <h5>{{error.message}}</h5>
    </div>
  </div>

</template>

<script>
export default {
  props: ['error'],
  data() {
    return {}
  },
}
</script>

<style scoped>
#error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#error-img {
  height: 50vh;
}
#message {
  text-align: center;
}
</style>