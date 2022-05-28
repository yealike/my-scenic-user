<template>
  <div class="container-lg my-main">
    <div class="row clearfix">
      <!-- 页头 -->
      <div class="col-md-12 column">
        <div class="page-header">
          <h1 style="margin-left: 30px;margin-bottom: 20px">
            {{ scenicInfo.name }}
          </h1>
        </div>
      </div>

      <!-- 景点基本信息 -->
      <div class="row clearfix">
        <div class="col-md-8">
          <img style="width: 100%;height: 400px;border-radius: 10px" :src="scenicInfo.url" :alt="scenicInfo.name">
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
      <h3 style="margin: 20px;color: #1BADB6">概述</h3>
      <div class="my-descript" v-html="descrip.descript"></div>
      <div style="margin-top: 20px">电话：{{ descrip.tel }}</div>
      <div>官网：{{ descrip.website }}</div>
      <div style="margin-bottom: 20px;">开放时间：{{ descrip.opentime }}</div>
    </div>

    <!-- 门票 -->
    <div style="margin: 20px">
      <h3 style="color: #1BADB6">门票</h3>
      <div v-for="item in priceList">
        {{ item.description }}--{{ item.price }}
      </div>
    </div>


    <!-- 旅游时节 -->
    <div style="margin: 20px">
      <h3 style="color: #1BADB6">旅游时节</h3>
      <div>{{ info.season }}</div>
    </div>

    <!-- 交通路线 -->
    <div style="margin: 20px">
      <h3 style="color: #1BADB6">交通路线</h3>
      <div v-html="info.traffic"></div>
    </div>

    <!-- 小贴士 -->
    <div style="margin: 20px">
      <h3 style="color: #1BADB6">小贴士</h3>
      <div v-html="info.tips"></div>
    </div>


    <div style="margin: 20px">
      <h3 style="color: #1BADB6;margin-bottom: 20px">评论</h3>
      <div style="display: flex">
        <img style="width: 50px;height: 50px;border-radius: 3px;" :src="userInfo.avatar" alt="头像">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="输入你的评论"
          style="margin-left: 5px"
          v-model="comment">
        </el-input>
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
import InfoApi from "@/api/scenic/InfoApi";
import cookie from "js-cookie";
import commentApi from "@/api/scenic/commentApi";

export default {
  name: "scenic-id",
  data() {
    return {
      id: this.$route.params.id,
      comment: '',
      scenicInfo: {
        cityId: '',
        name: '',
        position: '',
        url: '',
        star: '',
        adPrice: ''
      },
      descrip: {
        id: '',
        descript: '',
        opentime: '',
        tel: '',
        website: ''
      },
      priceList: [],
      info: {
        season: '',
        traffic: '',
        tips: ''
      },
      userInfo: {
        id: '',
        avatar: '',
        username: '',
        email: ''
      },
      commentList: []
    }
  },
  created() {

  },
  mounted() {

    let str = cookie.get('userInfo')
    if (str!==''){
      this.userInfo = JSON.parse(str)
    }

    this.getScenicInfo()
    this.getDescription()
    this.getPrice()
    this.getInfo()
    this.getComments()
  },
  methods: {
    // 获取评论列表
    getComments() {
      commentApi.getOneLevelCommentList(1, 10)
        .then(resp => {
          this.commentList = resp.data.data.commentInfo.records
          // console.log(resp.data.data.commentInfo.records)
        })

    },
    // 根据景点id查询景点信息
    getInfo() {
      InfoApi.getInfoByScenicId(this.id)
        .then(resp => {
          this.info.season = resp.data.data.information.season
          this.info.traffic = resp.data.data.information.traffic
          this.info.tips = resp.data.data.information.tips
        })
    },
    //获取价格列表
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
          this.descrip.id = resp.data.data.description.id
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
.my-main {
  border-radius: 6px;
  border: #9a9999 1px solid;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.6);
  /*background-color: rgba(231, 225, 225, 0.99);*/
}

.my-descript {
  border-radius: 10px;
}
</style>
