<template>
  <div class="container">
    <div>
      <!-- {{ scenicList }} -->
    </div>
    <div>
      <!-- {{ selectedTags }} -->
    </div>
    <div>
      <div class="citylist select-list">
        <span :style="{ marginRight: 8 }">景点筛选:</span>
        <template v-for="tag in cityList">
          <a-checkable-tag class="select" :key="tag.id" :checked="selectedTags.indexOf(tag) > -1" @change="(checked) => handleChange(tag, checked)">
            {{ tag.name }}
          </a-checkable-tag>
        </template>
      </div>
      <a-skeleton v-if="scenicListIsEmpty" active />
      <div v-if="!scenicListIsEmpty" class="card-list">
        <scenicCard class="card-item" v-for="item in scenicList" :key="item.id" :name="item.name" :url="item.url" :star="item.star" @click.native="toDetail(item.id)" />
      </div>
      <div class="scroll">向下滚动加载更多</div>
      <a-back-top>
        <a-button type="primary" class="up">UP</a-button>
      </a-back-top>
    </div>
  </div>
</template>

<script>
import scenicApi from '@/api/scenic'
import scenicCard from '@/components/card/scenicCard.vue'
import { scrollBottom } from '@/utils/scrollBottom'
export default {
  layout: 'default',
  name: 'index',
  components: {
    scenicCard,
  },
  data() {
    return {
      page: 0,
      scenicList: [],
      selectedTags: [],
      cityList: [],
      firstClick: true,
    }
  },
  mounted() {
    if (this.$store.state.scenic.scenicList?.length > 0) {
      this.scenicList = this.$store.state.scenic.scenicList
    } else {
      this.getScenicListInfo()
    }
    this.fetchCityList()
    window.addEventListener('scroll', this.scroll)
  },
  methods: {
    async getScenicListInfo() {
      this.page++
      console.log(this.page)
      const { data: res } = await scenicApi.getScenicList(this.page, 10)
      const list = res.records
      console.log(list)
      this.scenicList.push(...list)
    },
    // 去景点详情页
    toDetail(id) {
      this.$router.push({ path: '/scenic/' + id })
    },
    handleChange(tag, checked) {
      const { selectedTags } = this
      const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag)
      console.log('You are interested in: ', nextSelectedTags)
      this.selectedTags = nextSelectedTags
      //首次点击清理数据
      if (this.firstClick == true) {
        this.firstClick = false
        this.scenicList = []
      }
      if (checked) {
        //添加
        //获取城市的景点列表
        //遍历景点列表没找到加进去，有忽略
        this.fetchScenicListByCity(tag.name)
      } else {
        //移除
        this.removeByCityName(tag.name)
      }
    },
    //根据城市获取景点列表
    async fetchScenicListByCity(cityName) {
      const { data: res } = await scenicApi.fetchScenicByCity(1, 10, cityName)
      const list = res.records
      this.addToScenicList(list)
    },
    //获取城市列表
    async fetchCityList() {
      const { data: res } = await scenicApi.getCityList()
      this.cityList = res.list
    },
    //新增景点列表
    async addToScenicList(scenicList) {
      scenicList.map((newitem) => {
        // 不存在添加
        if (!this.scenicList.find((i) => i.id == newitem.id)) {
          this.scenicList.push(newitem)
        }
      })
    },
    //移除景点
    async removeByCityName(name) {
      const newList = []
      this.scenicList.filter((item) => {
        if (item.cityName !== name) {
          newList.push(item)
        }
      })
      this.scenicList = newList
      if (this.scenicList.length == 0) {
        this.getScenicListInfo()
      }
    },
    scroll() {
      scrollBottom(this.getScenicListInfo)
    },
  },
  computed: {
    scenicListIsEmpty() {
      return this.scenicList.length <= 0
    },
  },
  destroyed() {
    window.addEventListener('scroll', this.scroll)
  },
}
</script>

<style scoped>
.scroll {
  text-align: center;
  font-size: 15px;
}
.container {
  max-width: 1350px;
  margin: auto;
}
.thu-item {
  border: #00bb8f 1px solid;
  margin: 5px;
  border-radius: 5px;
  background-color: #98f5c4;
  cursor: pointer;
}

.thu-img {
  width: 99%;
  margin-top: 5px;
  margin-left: 0.5%;
  height: 200px;
  border-radius: 8px;
}
.select-list {
  height: 50px;
  line-height: 50px;
}
.select {
  padding: 5px 20px;
  /* background-color: orange; */
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.card-item {
  margin-right: 20px;
  margin-bottom: 10px;
}
.citylist {
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
}
.up {
  width: 50px;
  height: 50px;
  border-radius: 15px;
}
</style>
