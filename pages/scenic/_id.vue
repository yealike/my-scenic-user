<template>
  <div class="container-lg" style="border: #3C3C3C 1px solid">
    <div class="row clearfix">
      <!-- 页头 -->
      <div class="col-md-12 column">
        <div class="page-header">
          <h1>
            {{ scenicInfo.name }}
          </h1>
        </div>
      </div>

      <!-- 景点基本信息 -->
      <div class="row clearfix">
        <div class="col-md-8" style="border: #3C3C3C 1px solid">
          <img style="width: 100%;height: 400px" :src="scenicInfo.url" :alt="scenicInfo.name">
        </div>
        <div class="col-md-4" style="margin-top: 100px">
          <h3 v-text="scenicInfo.name"></h3>
          <h4>地址：{{ scenicInfo.position }}</h4>
          <h4>推荐指数：{{ scenicInfo.star }}</h4>
        </div>
      </div>
    </div>

    <!-- 概述 -->
    <div>
      <h3>概述</h3>
      <div v-html="descrip.descript"></div>
      <div>电话：{{ descrip.tel }}</div>
      <div>官网：{{ descrip.website }}</div>
      <div>开放时间：{{ descrip.opentime }}</div>
    </div>

    <!-- 门票 -->
    <div>
      <h3>门票</h3>
      <div v-for="item in priceList">
        {{item.description}}--{{item.price}}
      </div>
    </div>
  </div>

</template>

<script>
import scenicApi from "@/api/scenic/scenicApi";
import 'bootstrap/dist/css/bootstrap.css'
import cityApi from "@/api/scenic/cityApi";
import descriptionApi from "@/api/scenic/descriptionApi";
import priceApi from "@/api/scenic/priceApi";

export default {
  name: "scenic-id",
  data() {
    return {
      id: this.$route.params.id,
      scenicInfo: {
        cityId: '',
        name: '',
        position: '',
        url: '',
        star: '',
        adPrice: ''
      },
      descrip: {
        descript: '',
        opentime: '',
        tel: '',
        website: ''
      },
      priceList: []
    }
  },
  mounted() {
    this.getScenicInfo()
    this.getDescription()
    this.getPrice()
  },
  methods: {
    getPrice() {
      priceApi.getPriceList(this.id)
        .then(resp => {
          this.priceList = resp.data.data.priceList
        })
    },
    // 根据id获取景点信息
    getScenicInfo() {
      scenicApi.getScenicInfoById(this.id)
        .then(resp => {
          this.scenicInfo.name = resp.data.data.scenic.name
          this.scenicInfo.cityId = resp.data.data.scenic.cityId
          this.scenicInfo.position = resp.data.data.scenic.position
          this.scenicInfo.url = resp.data.data.scenic.url
          this.scenicInfo.star = resp.data.data.scenic.star
          this.scenicInfo.adPrice = resp.data.data.scenic.adPrice
        })
    },
    // 查询城市名称
    getCity() {
      cityApi.getCityNameById(this.scenicInfo.cityId)
        .then(resp => {
          console.log(resp)
          console.log(this.scenicInfo)
        })
    },
    // 根据景点id查询描述信息
    getDescription() {
      descriptionApi.getDescription(this.id)
        .then(resp => {
          this.descrip.descript = resp.data.data.description.description
          this.descrip.tel = resp.data.data.description.tel
          this.descrip.opentime = resp.data.data.description.opentime
          this.descrip.website = resp.data.data.description.website
        })
    }
  }
}
</script>

<style scoped>

</style>
