<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-md-12 column">
        <div class="row">

          <div class="col-md-4" v-for="item in scenicList">
            <div class="thumbnail thu-item" @click="toDetail(item.id)">
              <img class="thu-img" :alt="item.name" :src="item.url" />
              <div class="caption">
                <h3 align="center">
                  {{ item.name }}
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scenicApi from '@/api/scenic/scenicApi'

export default {
  layout: 'default',
  name: 'index',
  data() {
    return {
      scenicList: [],
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
</style>
