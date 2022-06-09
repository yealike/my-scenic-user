<template>
  <div class="htole-container">
    <a-row type="flex">
      <a-col class="htole-main" :flex="4">
        <a-skeleton v-if="hotleListIsEmpty" active />
        <General title="推荐" v-if="!hotleListIsEmpty">
          <template #tool>
            <!-- <div>tool</div> -->
          </template>
          <template #default>
            <div class="card-list">
              <hotelCard
                v-for="item in hotleList"
                :key="item.name"
                :address="item.address"
                :title="item.name"
                :url="item.pic"
                :price="item.price"
                :id="item.id"
                @click.native="searchById(item.id)"
              />
            </div>
          </template>
        </General>
      </a-col>
      <a-col class="htole-banner" :flex="2">
        <a-affix>
          <div class="banner-img">
            <img class="img" src="@/assets/images/login-bg.jpg" alt="" />
            <client-only>
              <el-amap
                class="amap"
                vid="amapDemo"
                :zoom="zoom"
                :center="center"
              >
              </el-amap>
            </client-only>
          </div>
          <div>
            <a-button @click="search" class="search-btn">search</a-button>
          </div>
          <div class="input">
            <a-input v-model="searchKey" placeholder="Basic usage" />
          </div>
          <a-skeleton v-if="!currentHotel" active />
          <div v-if="currentHotel" class="hotle-info-detail">
            <div class="name">{{ this.currentHotel.name }}</div>
            <div class="address">{{ this.currentHotel.address }}</div>
            <div class="price">{{ this.currentHotel.price }}</div>
            <div class="score">{{ this.currentHotel.score }}</div>
            <div class="brand">{{ this.currentHotel.brand }}</div>
            <div class="city">{{ this.currentHotel.city }}</div>
            <div class="starname">{{ this.currentHotel.starname }}</div>
            <div class="business">{{ this.currentHotel.business }}</div>
          </div>
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import General from '@/components/container/General.vue'
import hotelCard from '@/components/card/hotelCard.vue'
import hotle from '@/api/hotel'
import { scrollBottom } from '@/utils/scrollBottom'
export default {
  layout: 'default',
  components: {
    General,
    hotelCard,
  },
  data() {
    return {
      zoom: 15,
      center: [125.441458, 43.883363],
      hotleList: [],
      currentHotel: {},
      searchKey: '',
      page: 0,
      first: true,
    }
  },
  methods: {
    async getAllHotel() {
      this.page++
      const { data: res } = await hotle.getPart(this.page, 10)
      this.hotleList.push(...res.records)
      if (this.first) {
        this.currentHotel = this.hotleList[0]
        this.first = false
      }
    },
    search() {
      console.log(this.searchKey)
      //
    },
    async searchById(id) {
      const { data: res } = await hotle.getById(id)
      this.currentHotel = res.hotel
    },
    scroll() {
      scrollBottom(this.getAllHotel)
    },
  },
  mounted() {
    this.getAllHotel()
    window.addEventListener('scroll', this.scroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll)
  },
  computed: {
    hotleListIsEmpty() {
      return this.hotleList.length <= 0
    },
  },
}
</script>

<style scoped>
.main {
  text-align: right;
  background-color: #fff;
}
.main-1 {
  text-align: right;
  height: 300px;
  /* background-color: rgb(97, 27, 27); */
}
.htole-container {
  min-width: 1180px;
  max-width: 1500px;
  width: 90vw;
  margin: auto;
}
.htole-main {
  /* height: 800px; */
  width: 900px;
  /* overflow: auto; */
  /* background: #000; */
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}
.htole-banner {
  position: relative;
  width: 500px;
  margin-top: 50px;
}
.banner-img {
  width: 450px;
  height: 300px;
  margin-left: 20px;
  border-radius: 5px;
  overflow: hidden;
}
.amap {
  width: 100%;
  height: 100%;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.search-btn {
  position: absolute;
  left: 50%;
  transform: translate(-60%, -50%);
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 50px;
  border: none;
  box-shadow: 5px 5px 15px rgb(235, 233, 233);
  z-index: 999;
}
.input {
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 30px;
  width: 450px;
}
.hotle-info-detail {
  overflow: hidden;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 10px;
}
.name {
  font-size: 18px;
  font-weight: 800;
  margin: 10px 0;
}
.address {
  margin-top: 5px;
}
.price {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 800;
  color: orange;
}
.score {
  margin-top: 5px;
  font-size: 18px;
  font-weight: 600;
  color: orange;
}
.brand {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;
}
.city {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;
}
.starname {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;
}
.business {
  margin-top: 5px;
  font-size: 20px;
  font-weight: 400;
}
</style>
