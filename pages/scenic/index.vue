<template>
  <div class="container">
    <div>
      <div class="select-list">
        <span :style="{ marginRight: 8 }">景点筛选:</span>
        <template v-for="tag in tags">
          <a-checkable-tag class="select" :key="tag" :checked="selectedTags.indexOf(tag) > -1" @change="checked => handleChange(tag, checked)">
            {{ tag }}
          </a-checkable-tag>
        </template>
      </div>
      <a-skeleton active />
      <div class="card-list">
        <scenicCard class="card-item" v-for="item in 6" :key="item" />
      </div>
    </div>
  </div>
</template>

<script>
import scenicApi from '@/api/scenic/scenicApi'
import scenicCard from '@/components/card/scenicCard.vue'
export default {
  layout: 'default',
  name: 'index',
  components: {
    scenicCard,
  },
  data() {
    return {
      scenicList: [],
      checked1: false,
      checked2: false,
      checked3: false,
      tags: ['Movies', 'Books', 'Music', 'Sports'],
      selectedTags: [],
    }
  },
  mounted() {
    this.getScenicListInfo()
  },
  methods: {
    getScenicListInfo() {
      scenicApi.getScenicList(1, 10).then((resp) => {
        this.scenicList = resp.data.data.records
      })
      console.log(123, this.scenicList)
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
    },
  },
}
</script>

<style scoped>
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
</style>
