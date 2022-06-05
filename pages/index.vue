<template>
  <div class="indexpage">
    <a-carousel autoplay>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
    </a-carousel>
    <cityList />
    <a-row type="flex">
      <a-col flex="800px">
        <infoCard />
        <infoCard />
        <infoCard />
        <infoCard />
        <infoCard />
      </a-col>
      <a-col flex="auto">
        <a-affix :offset-top="top">
          <a-carousel class="banner-auto" effect="fade">
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </a-carousel>
          <div class="today">
            <h1 class="today-title">
              taday
              <a-icon type="cloud" />
            </h1>
            <div>
              {{cloudList[0].date}}
            </div>
            <div>
              {{cloudList[0].tem2}}~{{cloudList[0].tem1}}
            </div>
            <div>
              {{cloudList[0].wea_day}}
            </div>
            <div class="air_tips">
              {{cloudList[0].air_tips}}
            </div>
            <div class="cloud">
              <div v-for="item in cloudList" class="cloud-item">
                <div>{{item.day.slice(0,3)}}</div>
                <div>{{item.week}}</div>
                <div>{{item.wea}}</div>
                <div>{{item.air_level}}</div>
              </div>
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
export default {
  layout: 'default',
  name: 'IndexPage',
  components: { scenic, TEditor, cityList, infoCard },
  async asyncData(ctx) {
    const {
      data: { data: cloudList },
    } = await cloudapi.getCloud()
    console.log(cloudList)
    return {
      cloudList,
    }
  },
  data() {
    return {
      couldList: [],
    }
  },
  methods: {},
}
</script>
<style  scoped>
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
  background-color: #ccc;
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
</style>
