<template>
  <div class="logCard">
    <div class="log-img">
      <img src="@/assets/images/login-bg.jpg" alt="" />
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
  },
}
</script>

<style scoped>
.logCard {
  margin: 5px;
  /* margin-right: 37px; */
  width: 218px;
  height: 200px;
  /* background-color: #111; */
}
.log-img {
  width: 218px;
  height: 135px;
  cursor: pointer;
  /* background-color: #444; */
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
</style>
