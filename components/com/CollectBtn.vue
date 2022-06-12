<template>
  <a-button type="primary" @click="toggleCollect">{{ message }}</a-button>
</template>

<script>
import userApi from '@/api/user.js'
export default {
  props: {
    link: String,
    tag: String,
    tagId: String,
    title: String,
    userId: String,
  },
  data() {
    return {
      collect: false,
    }
  },
  methods: {
    //查询收藏
    async fetchCollect() {
      // const { data: res } = await userApi.fetchLike(this.UId, this.AId)
      this.collect = true
    },
    // 添加
    async addCollect() {
      const { data: res } = await userApi.collect({
        link: this.link,
        tag: this.tag,
        tagId: this.tagId,
        title: this.title,
        userId: this.userId,
      })
      //   this.like = res.isPraise
      this.fetchCollect()
    },
    // 移除
    async removeCollect() {
      const { data: res } = await userApi.removeCollect()
    },
  },
  computed: {
    message() {
      return this.like ? '已收藏' : '收藏'
    },
  },
  mounted() {
    this.fetchLike()
  },
}
</script>

<style></style>
