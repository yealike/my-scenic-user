<template>
  <div class="indexpage">
    <a-carousel class="autopaly-banner" autoplay>
      <div v-for="item in bannerList">
        <img class="banner-img" :src="item" alt="" />
      </div>
    </a-carousel>
    <cityList />
    <a-row type="flex" class="index-center">
      <a-col class="index-left">
        <!-- <a-skeleton active />
        <a-skeleton active />
        <a-skeleton active />
        <a-skeleton active /> -->
        <div class="goodTitle">推荐去的景点</div>
        <infoCard
          v-for="item in scenicList"
          :key="item.id"
          :title="item.name"
          :url="item.url"
          :cityName="item.cityName"
          :position="item.position"
          :adPrice="item.adPrice"
          :star="item.star"
          @click.native="gotoDetail(item.id)"
        />
      </a-col>
      <a-col class="index-left">
        <a-affix>
          <a-carousel class="banner-auto" autoplay>
            <div v-for="(item, index) in miniBannerList" :key="index">
              <img class="banner-img" :src="item" alt="" />
            </div>
          </a-carousel>
          <div v-if="couldIsUnknown" class="today">
            <h1 class="today-title">
              taday
              <div class="cloud-icon">
                <img src="@/assets/images/天气.png" alt="" />
              </div>
            </h1>
            <div>
              {{ cloudList[0].date }}
            </div>
            <div>{{ cloudList[0].tem2 }}~{{ cloudList[0].tem1 }}</div>
            <div>
              {{ cloudList[0].wea_day }}
            </div>
            <div class="air_tips">
              {{ cloudList[0].air_tips }}
            </div>
            <div class="cloud">
              <div v-for="item in cloudList" class="cloud-item">
                <div>{{ item.day.slice(0, 3) }}</div>
                <div>{{ item.week }}</div>
                <div>{{ item.wea }}</div>
                <div>{{ item.air_level }}</div>
              </div>
            </div>
          </div>
          <a-skeleton v-if="!couldIsUnknown" active />
          <div class="banna">
            <a-skeleton v-if="getJournalListIsEmpty" active />
            <div class="goodTitle">景点LOG</div>
            <div v-if="!getJournalListIsEmpty">
              <journalCard
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
              />
            </div>
          </div>
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import scenic from '@/pages/scenic'
import TEditor from '@/components/TEditor'
import cityList from '@/components/card/cityList.vue'
import infoCard from '@/components/card/infoCard.vue'
import cloudapi from '@/api/cloud'
import scenicApi from '@/api/scenic'
import journalCard from '@/components/card/journalCard.vue'
import article from '@/api/article'
import { scrollBottom } from '@/utils/scrollBottom'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: { scenic, TEditor, cityList, infoCard, journalCard },
  async asyncData(ctx) {
    // const {
    //   data: { data: cloudList },
    // } = await cloudapi.getCloud()
    // return {
    //   cloudList,
    // }
  },
  data() {
    return {
      couldList: [],
      scenicList: [],
      page: 0,
      journalList: [],
    }
  },
  methods: {
    gotoDetail(id) {
      this.$router.push('/scenic/' + id)
    },
    //获取下一页的list追加到scenicList
    async fetchIndex() {
      this.page++
      const { data: res } = await scenicApi.getScenicList(this.page, 10)
      const list = res.records
      this.scenicList.push(...list)
    },
    //获取bannerlist
    fetchBanner() {},
    async getJournalList() {
      const { data: res } = await article.getTopArticle()
      this.journalList = res.praiseTop10.slice(0, 3)
      console.log(res)
      console.log(this.journalList)
    },
    scroll() {
      scrollBottom(this.fetchIndex)
    },
  },
  computed: {
    couldIsUnknown() {
      return this.couldList[0]
    },
    getJournalListIsEmpty() {
      return this.journalList.length <= 0
    },
    bannerList() {
      const arr = []
      for (let i = 1; i < 6; i++) {
        arr.push(require(`../assets/images/banner (${i}).png`))
      }
      return arr
    },
    miniBannerList() {
      const arr = []
      for (let i = 1; i < 4; i++) {
        arr.push(require(`../assets/images/img (${i}).png`))
      }
      return arr
    },
  },
  mounted() {
    this.fetchIndex()
    this.getJournalList()
    window.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll)
  },
}
</script>
<style scoped>
.index-center {
  justify-content: center;
}
.indexpage {
  width: 85vw;
  max-width: 1305px;
  margin: auto;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.banner-auto {
  margin-left: 5px;
  width: 500px;
}
.cloud {
  width: 500px;
  margin-top: 15px;
  height: 150px;
  /* background-color: #ccc; */
  display: flex;
  justify-content: space-around;
}
.cloud-item {
  width: 80px;
  text-align: center;
}
.today {
  width: 500px;
  /* margin: 20px 0; */
  margin-left: 5px;
}
.today-title {
  font-size: 20px;
  font-weight: 800;
}
.air_tips {
  font-weight: 600;
}
.banna {
  max-width: 500px;
  margin: auto;
}
.banner-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.autopaly-banner {
  margin-top: 30px;
}
.goodTitle {
  height: 50px;
  font-size: 20px;
  font-weight: 800;
  line-height: 50px;
}
.cloud-icon {
  width: 30px;
  height: 30px;
  display: inline-block;
}
</style>
