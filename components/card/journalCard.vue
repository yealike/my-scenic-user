<template>
  <div class="journal-card">
    <div class="head">
      <div class="avatar">
        <img @click="gotoUser(id)" :src="avatar" alt="" />
      </div>
      <div class="journal-title">
        <div class="title">{{ title }}</div>
        <div class="info">
          <div>{{ username }}{{ gmtCreate }}</div>
          <div class="info-icon">
            <span> <a-icon type="eye" />{{ viewCount }} </span>
            <span> <a-icon type="like" />{{ praiseCount }} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="other-info"></div>
    <div class="img-list">
      <img @click="gotoArticle(id)" class="img" :src="cover" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
    id: String,
    cover: String,
    avatar: String,
    title: String,
    username: String,
    viewCount: Number,
    praiseCount: Number,
    gmtCreate: String,
  },
  methods: {
    gotoArticle(id) {
      this.$router.push(`/journal/${id}`)
    },
    gotoUser(id) {
      this.$router.push(`/person/${id}`)
    },
  },
}
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
