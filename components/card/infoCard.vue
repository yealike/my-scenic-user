<template>
  <div class="info-card">
    <div class="info-img">
      <img :src="url" alt="">
    </div>
    <div class="info-main">
      <div class="title">
        Title
      </div>
      <div class="info">
        456cmiosnl
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: '',
  },
}
</script>

<style scoped>
.info-card {
  width: 800px;
  height: 300px;
  padding: 20px;
  display: flex;
  background-color: #666;
  justify-content: space-between;
  align-items: flex-start;
}
.info-card .info-img {
  width: 260px;
  height: 260px;
  background-color: pink;
}

img {
  width: 100%;
  object-fit: cover;
}

.info-main {
  flex: 1;
  margin-left: 10px;
  background-color: #fff;
}
.title {
  font-size: 20px;
  color: orange;
  font-weight: 800;
  text-align: left;
}
</style>