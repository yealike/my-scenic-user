<template>
  <div>
    <a-row class="scenic-card-id" type="flex">
      <a-col class="map-comment" :flex="4">
        <div class="map-item">

        </div>
        <div class="comments">评论319最热最新</div>
        <div class="avatar">
          <img src="" alt="">
        </div>
        <a-input-search class="input" placeholder="评论内容" enter-button="Search" size="large" @search="onSearch" />
        <a-comment class="comment-item">
          <span slot="actions" key="comment-nested-reply-to">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
          <p slot="content">
            We supply a series of design principles, practical patterns and high quality design resources
            (Sketch and Axure).
          </p>
          <a-comment class="comment-item">
            <span slot="actions">Reply to</span>
            <a slot="author">Han Solo</a>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
            <p slot="content">
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </a-comment>
          <a-comment class="comment-item">
            <span slot="actions">回复</span>
            <a slot="author">Han Solo</a>
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />
            <p slot="content">
              We supply a series of design principles, practical patterns and high quality design
              resources (Sketch and Axure).
            </p>
          </a-comment>
        </a-comment>
      </a-col>
      <a-col :flex="2">
        <div class="scenic-info">
          <client-only>
            <el-amap class="amap" vid="amapDemo" :zoom="zoom" :center="center"> </el-amap>
          </client-only>
        </div>
        <div class="scenic-info-card">
          <div class="card-message">
            <scenicCard class="card" />
            <div class="message">
              <div class="title">title</div>
              message
            </div>
          </div>
          <div class="card-message">
            <scenicCard class="card" />
            <div class="message">
              <div class="title">title</div>
              message
            </div>
          </div>
          <div class="card-message">
            <scenicCard class="card" />
            <div class="message">
              <div class="title">title</div>
              message
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import scenicApi from '@/api/scenic/scenicApi'
import cityApi from '@/api/scenic/cityApi'
import descriptionApi from '@/api/scenic/descriptionApi'
import priceApi from '@/api/scenic/priceApi'
import InfoApi from '@/api/scenic/InfoApi'
import commentApi from '@/api/scenic/commentApi'
import scenicCard from '@/components/card/scenicCard.vue'
export default {
  name: 'scenic-id',
  components: {
    scenicCard,
  },
  data() {
    return {
      zoom: 15,
      center: [125.441458, 43.883363],
      id: this.$route.params.id,
      comment: '',
      scenicInfo: {
        cityId: '',
        name: '',
        position: '',
        url: '',
        star: '',
        adPrice: '',
      },
      descrip: {
        id: '',
        descript: '',
        opentime: '',
        tel: '',
        website: '',
      },
      priceList: [],
      info: {
        season: '',
        traffic: '',
        tips: '',
      },
      userInfo: {
        id: '',
        avatar: '',
        username: '',
        email: '',
      },
      commentList: [],
    }
  },
  created() {},
  mounted() {
    let str = localStorage.getItem('userInfo')
    if (str == '' || str == null || str == undefined) {
      console.log('localStorage--userInfo不存在,用户可能未登录==>scenic/id')
    } else {
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
      commentApi.getOneLevelCommentList(1, 10).then((resp) => {
        this.commentList = resp.data.data.commentInfo.records
        // console.log(resp.data.data.commentInfo.records)
      })
    },
    // 根据景点id查询景点信息
    getInfo() {
      InfoApi.getInfoByScenicId(this.id).then((resp) => {
        this.info.season = resp.data.data.information.season
        this.info.traffic = resp.data.data.information.traffic
        this.info.tips = resp.data.data.information.tips
      })
    },
    //获取价格列表
    getPrice() {
      priceApi.getPriceList(this.id).then((resp) => {
        this.priceList = resp.data.data.priceList
      })
    },
    // 根据id获取景点信息
    getScenicInfo() {
      scenicApi.getScenicInfoById(this.id).then((resp) => {
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
      cityApi.getCityNameById(this.scenicInfo.cityId).then((resp) => {
        console.log(resp)
        console.log(this.scenicInfo)
      })
    },
    // 根据景点id查询描述信息
    getDescription() {
      descriptionApi.getDescription(this.id).then((resp) => {
        this.descrip.id = resp.data.data.description.id
        this.descrip.descript = resp.data.data.description.description
        this.descrip.tel = resp.data.data.description.tel
        this.descrip.opentime = resp.data.data.description.opentime
        this.descrip.website = resp.data.data.description.website
      })
    },
  },
}
</script>

<style scoped>
.scenic-card-id {
  max-width: 1500px;
  margin: auto;
  height: 500px;
  background-color: #ccc;
}
.map-item {
  height: 500px;
  width: 100%;
  /* background-color: #777; */
  margin-right: 50px;
}
.map-comment {
  max-width: 900px;
  margin-right: 50px;
}
.scenic-info {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #789;
}
.comments {
  font-size: 18px;
}
.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #456;
}
.input {
  width: 500px;
}
.comment-item {
  max-width: 900px;
  padding-bottom: 0;
}
.comment-item p {
  height: 80px;
}
.scenic-info-card {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 500px;
  max-width: 500px;
  /* background-color: #444; */
}
.card {
  height: 200px;
  margin-top: 10px;
}
.card-message {
  display: flex;
}
.message {
  margin-top: 10px;
  font-size: 20px;
  margin-left: 20px;
}
.title {
  font-weight: 800;
  margin-bottom: 10px;
}
</style>
