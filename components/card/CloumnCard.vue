<template>
  <div class="container-clo">
    <div class="list">
      <div class="img">
        <img :src="url" alt="" />
        <div></div>
      </div>
      <div class="content">
        <div class="title">{{ content }}</div>
        <div class="icon">
          <img src="@/assets/images/拍摄.png" alt="" />
        </div>
        <div class="goto">点击查看</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    content: String,
  },
}
</script>

<style>
.container-clo {
  cursor: pointer;
  width: 230px;
  height: 400px;
  margin-top: 5px;
  background-color: #999;
  background-color: orange;
  overflow: hidden;
}
.container-clo .list {
  width: 200%;
  transition: all 0.3s ease-out;
}
.container-clo .list .content {
  float: left;
  width: 230px;
  height: 400px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-clo .list .img {
  float: left;
  width: 230px;
  height: 400px;
}
.icon {
  width: 50px;
  height: 50px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.container-clo:hover .list {
  margin-left: -230px;
}
.container-clo .title {
  font-weight: 800;
}
.goto {
  font-size: 13px;
  font-weight: 200;
}
</style>
