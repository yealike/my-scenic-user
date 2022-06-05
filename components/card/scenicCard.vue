<template>
  <div class="scenic-card">
    <img src="@/assets/images/login-bg.jpg" alt="">
    <div class="font"> Title
      chili</div>
    <div class="star">4</div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.scenic-card {
  position: relative;
  width: 300px;
  height: 200px;
}
img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  transition: all 0.3s;
}
.star {
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 18px;
  font-weight: 800;
}
.font {
  position: absolute;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
}
.scenic-card:hover .font {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  color: #fff;
  font-size: 20px;
  font-weight: 800;
}
.scenic-card:hover img {
  height: 200px;
  cursor: pointer;
}
</style>