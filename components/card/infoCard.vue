<template>
  <div class="info-card">
    <div class="info-img">
      <img :src="url" alt="" />
    </div>
    <div class="info-main">
      <div class="message">{{ message }}</div>
      <div class="title">{{ title }}</div>
      <div class="info">{{ cityName }}</div>
      <div class="info">{{ position }}</div>
      <div class="info">{{ adPrice }}</div>
      <div class="info">{{ star }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    url: String,
    title: String,
    cityName: String,
    position: String,
    adPrice: '',
    star: '',
  },
}
</script>

<style scoped>
.info-card {
  width: 800px;
  height: 186px;
  padding: 0 20px 20px 0;
  display: flex;
  /* background-color: #666; */
  justify-content: space-between;
  align-items: flex-start;
}
.info-card .info-img {
  width: 200px;
  height: 130px;
  background-color: pink;
}

img {
  height: 100%;
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
