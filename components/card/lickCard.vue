<template>
  <div class="lick-card">
    <div class="img">
      <img src="@/assets/images/login-bg.jpg" alt="">
    </div>
    <nuxt-link class="title" :to="url">
      title
    </nuxt-link>
    <div class="tag">
      tag
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: '',
    title: '',
    tag: '',
  },
}
</script>

<style scoped>
.lick-card {
  min-width: 300px;
  max-width: 400px;
  display: flex;
  align-items: center;
}
.title {
  flex: 1;
  margin-left: 20px;
  font-weight: 600;
  font-size: 18px;
}
.img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tag {
  font-weight: 800;
}
</style>