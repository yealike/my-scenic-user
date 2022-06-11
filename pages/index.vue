<template>
  <div class="welcome-bg">
    <div class="info-main">
      <div class="title">旅行者说</div>
      <div class="info-message-main">
        <p>这是一个旅游Log分享网站,我们提供景点，住宿，天气的查询</p>
        <p>你可以在这里分享旅游心得，了解出行攻略</p>
        <p>旅行从这里开始</p>
        <div>体验从未有过的生活</div>
        <div>在旅途中发现感受新奇的事物</div>
      </div>
    </div>
    <div class="wecan">
      <div>we&nbsp;can</div>
      <div class="item">找去处</div>
      <div class="item">找攻略</div>
      <div class="item">找住宿</div>
      <div class="item">分享LOG</div>
      <nuxt-link to="/home">
        <a-button class="enter" type="primary">Let's Go!!!</a-button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'welcome',
  mounted() {
    console.log(process.env.BASE_URL)
  },
}
</script>

<style scoped>
.welcome-bg {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/welcome.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  margin-bottom: 50px;
  font-weight: 900;
  font-size: 50px;
  color: #fff;
}
.info-message {
  font-weight: 900;
  font-size: 30px;
  color: #fff;
}
.info-main {
  margin-right: 20px;
  font-weight: 900;
  font-size: 30px;
  color: #fff;
}
.info-message-main {
  font-size: 18px;
}
.wecan {
  font-weight: 900;
  font-size: 50px;
  color: #fff;
}
.wecan .item {
  font-size: 30px;
  font-weight: 600;
}
.enter {
  width: 260px;
  height: 60px;
  border-radius: 60px;
  font-size: 20px;
  font-weight: 900;
  color: #fff;
}
</style>
