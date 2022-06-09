<template>
  <div class="container">
    <div v-html="article.content"></div>
    <LikeBtn v-if="Uid" :UId="Uid" :AId="Aid" />
  </div>
</template>

<script>
import articleApi from '@/api/article'
import LikeBtn from '@/components/com/LikeBtn.vue'
export default {
  data() {
    return {
      article: {},
      Aid: this.$route.params.id,
      Uid: '',
    }
  },
  components: {
    LikeBtn,
  },
  methods: {
    async fetchArticle() {
      const id = this.$route.params.id
      const { data: res } = await articleApi.getDetail(id)
      this.article = res.article
    },
  },
  mounted() {
    this.fetchArticle()
    this.Uid = JSON.parse(window.localStorage.getItem('user')).id
  },
}
</script>

<style scoped>
.container {
  width: 1300px;
  margin: auto;
}
</style>
