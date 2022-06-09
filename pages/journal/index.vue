<template>
  <div class="banna">
    <a-skeleton v-if="getJournalListIsEmpty" active />
    <div class="goodTitle">近期热门</div>
    <div v-if="!getJournalListIsEmpty">
      <div class="my-banner">
        <CloumnCard
          v-for="item in topList"
          @click.native="gotoDetail(item.id)"
          :key="item.id"
          :content="item.title"
          :url="item.cover"
        />
      </div>
      <!-- <journalCard
        v-for="item in journalList"
        :id="item.id"
        :key="item.id"
        :title="item.title"
        :username="item.username"
        :cover="item.cover"
        :praiseCount="item.praiseCount"
        :viewCount="item.viewCount"
        :gmtCreate="item.gmtCreate"
        :userId="item.userId"
      /> -->
      <div class="goodTitle">推荐看的Log</div>
      <div class="log-container">
        <logCard
          v-for="item in journalList"
          @click.native="gotoDetail(item.id)"
          :key="item.id"
          :user="item.username"
          :title="item.title"
          tag="Log"
        />
      </div>
    </div>
  </div>
</template>

<script>
import journalCard from '@/components/card/journalCard.vue'
import logCard from '@/components/card/logCard.vue'
import CloumnCard from '@/components/card/CloumnCard.vue'
import { scrollBottom } from '@/utils/scrollBottom'
import article from '@/api/article'
export default {
  layout: 'defaut',
  components: {
    journalCard,
    logCard,
    CloumnCard,
  },
  data() {
    return {
      journalList: [],
      page: 0,
    }
  },
  methods: {
    async getJournalList() {
      this.page++
      const { data: res } = await article.getArticle(this.page, 10)
      this.journalList.push(...res.page.records)
    },
    gotoDetail(id) {
      this.$router.push(`/journal/${id}`)
    },
    scroll() {
      scrollBottom(this.getJournalList)
    },
  },
  computed: {
    getJournalListIsEmpty() {
      return this.journalList.length <= 0
    },
    topList() {
      return this.journalList.slice(0, 5)
    },
    List() {
      // return this.journalList.slice(5)
    },
  },
  mounted() {
    this.getJournalList()
    window.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    window.addEventListener('scroll', this.scroll)
  },
}
</script>

<style>
.banna {
  max-width: 1300px;
  margin: auto;
}
.log-container {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.my-banner {
  height: 410px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: space-between;
}
.goodTitle {
  height: 50px;
  font-size: 20px;
  font-weight: 800;
  line-height: 50px;
}
</style>
