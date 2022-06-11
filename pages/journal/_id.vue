<template>
  <div class="container">
    <h1 class="art-title">{{ article.title }}</h1>
    <div class="title-body">
      <img class="avatar" :src="article.avatar" alt="" />
      <span class="username">{{ article.username }}</span>
    </div>
    <div v-html="article.content"></div>
    <LikeBtn v-if="user.id" :UId="user.id" :AId="Aid" />
  </div>
</template>

<script>
import articleApi from '@/api/article'
import userApi from '@/api/user'
import LikeBtn from '@/components/com/LikeBtn.vue'
export default {
  data() {
    return {
      article: {},
      Aid: this.$route.params.id,
      user: {},
    }
  },
  components: {
    LikeBtn,
  },
  methods: {
    async fetchArticle() {
      const id = this.$route.params.id
      const { data: res } = await articleApi.getDetail(id)
      console.log('789', res)
      this.article = res.article
      console.log(this.article)
      const history = {
        link: window.location.href,
        tag: 'Log',
        tagId: this.article.id,
        title: this.article.title,
        userId: this.user.id,
      }
      userApi.addHistory(history)
    },
  },
  mounted() {
    this.fetchArticle()
    this.user = window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user'))
      : {}
  },
}
</script>

<style scoped>
.container {
  width: 1300px;
  margin: auto;
}
.art-title {
  font-weight: 800;
  text-align: center;
}
.title-body {
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
