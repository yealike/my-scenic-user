<template>
  <div class="logCard">
    <div class="log-img">
      <img :src="url" alt="" />
    </div>
    <h3 class="title">{{ title }}</h3>
    <div class="info">
      <div class="tag">{{ tag }}</div>
      <div class="price">{{ user }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    tag: String,
    title: String,
    url: String,
  },
}
</script>

<style scoped>
.logCard {
  border-radius: 5px;
  overflow: hidden;
  margin: 5px;
  /* margin-right: 37px; */
  width: 218px;
  height: 200px;
  transition: all 0.2s;
  /* background-color: #111; */
}
.log-img {
  width: 218px;
  height: 135px;
  cursor: pointer;
  overflow: hidden;
  /* background-color: #444; */
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.2s;
}
.title {
  width: 218px;
}
.info {
  display: flex;
  justify-content: space-between;
}
.logCard .tag {
  border: 2px solid #ccc;
  padding: 2px 5px;
  border-radius: 8px;
}
.log-img:hover img {
  width: 110%;
  height: 110%;
  transform: rotate(1deg);
}
.logCard:hover {
  transform: rotate(1deg);
  box-shadow: 5px 5px 5px #ccc;
}
</style>
