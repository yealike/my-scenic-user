<template>
  <a-button type="primary" @click="toggleLike">{{ message }}</a-button>
</template>

<script>
import articleApi from '@/api/article.js'
export default {
  props: {
    AId: String,
    UId: String,
  },
  data() {
    return {
      like: false,
    }
  },
  methods: {
    async fetchLike() {
      console.log(this.UId, this.AId)
      const { data: res } = await articleApi.fetchLike(this.UId, this.AId)
      if (res.isPraise) {
        this.like = true
      }
    },
    async toggleLike() {
      const { data: res } = await articleApi.like(this.UId, this.AId)
      this.like = res.isPraise
      this.fetchLike()
    },
  },
  computed: {
    message() {
      return this.like ? '已点赞' : '点赞'
    },
  },
  mounted() {
    this.fetchLike()
  },
}
</script>

<style></style>
