<template>
  <div class="out-container">
    <div class="scenic-card" :style="{ backgroundImage: `url(${url})` }">
      <div class="star">
        <a-icon
          class="icon-my"
          type="star"
          theme="filled"
          v-for="item in star"
          :key="item"
        />
      </div>
    </div>
    <div class="font">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    star: Number,
    url: String,
  },
  computed: {
    imgURL() {
      return require(`../../assets/images/icon (${this.star}).png`)
    },
    bgURL() {
      return
    },
  },
}
</script>

<style scoped>
.out-container {
  position: relative;
  border-radius: 5px;
}
.scenic-card {
  width: 300px;
  cursor: pointer;
  height: 200px;
  transition: all 0.2s ease-in-out;
  background-size: cover;
}
.out-container:hover .scenic-card::after {
  opacity: 0.6;
}
.scenic-card::after {
  transition: all 0.3s;
  display: block;
  opacity: 0;
  content: '';
  width: 300px;
  height: 200px;
  background-color: #000;
  z-index: 999;
}
.star {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 18px;
  font-weight: 800;
}
.icon-my {
  font-size: 20px;
  color: orange;
}

.font {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
}
.out-container:hover .font {
  opacity: 1;
  cursor: pointer;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 20px;
  font-weight: 800;
}
</style>
