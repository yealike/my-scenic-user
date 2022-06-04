<template>
  <div class="journal-card">
    <div class="head">
      <div class="avatar">
        <img src="@/assets/images/login-bg.jpg" alt="">
      </div>
      <div class="journal-title">
        <div class="title">Title</div>
        <div class="info">
          <div>390</div>
          <div class="info-icon">
            <span>
              <a-icon type="eye" />278
            </span>
            <span>
              <a-icon type="like" />8093
            </span>
            <span>
              <a-icon type="heart" />890
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="other-info">
    </div>
    <div class="img-list">
      <img class="img" src="@/assets/images/login-bg.jpg" alt="">
      <img class="img" src="@/assets/images/login-bg.jpg" alt="">
      <img class="img" src="@/assets/images/login-bg.jpg" alt="">
      <img class="img" src="@/assets/images/login-bg.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.journal-card {
  margin-top: 5px;
  border-top: 1px solid #ccc;
}
.head {
  margin: 5px 0;
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.journal-title {
  flex: 1;
  margin-left: 20px;
}
.title {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 600;
  color: orange;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  line-height: 20px;
}
.info-icon {
  margin: 0 50px;
}
.info-icon span {
  margin-left: 18px;
}
.img-list {
  margin-left: 70px;
  height: 213px;
  overflow: hidden;
}
img {
  height: 100%;
  object-fit: cover;
}
</style>