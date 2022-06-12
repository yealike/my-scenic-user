<template>
  <div class="info-card">
    <div class="info-img">
      <img :src="url" alt="" />
    </div>
    <div class="info-main">
      <div class="message">{{ message }}</div>
      <div class="title">{{ title }}</div>
      <div class="info">城市：{{ cityName }}</div>
      <div class="info">地址：{{ position }}</div>
      <div class="info">票价：{{ adPrice }}$</div>
      <div class="info">
        星级：<a-icon type="star" v-for="item in star" :key="item" />
      </div>
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
  height: 166px;
  padding: 0 20px 10px 0;
  padding-top: 10px;
  display: flex;
  /* background-color: #666; */
  border-top: 1px solid #ccc;
  justify-content: space-between;
  align-items: flex-start;
  /* background-image: linear-gradient(#f1eae9, #ffffff); */
}
.info-card .info-img {
  width: 200px;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
  /* background-color: pink; */
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.info-main {
  flex: 1;
  margin-left: 10px;
  /* background-color: #fff; */
}
.title {
  font-size: 20px;
  color: orange;
  font-weight: 800;
  text-align: left;
}
</style>
