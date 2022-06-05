<template>
  <div class="htole-container">
    <a-row type="flex">
      <a-col class="htole-main" :flex="4">
        <General title="chili">
          <template #tool>
            <div>tool</div>
          </template>
          <template #default>
            <div class="card-list">
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
            </div>
          </template>
        </General>
        <General title="chili">
          <template #tool>
            <div>tool</div>
          </template>
          <template #default>
            <div class="card-list">
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
              <hotelCard />
            </div>
          </template>
        </General>
      </a-col>
      <a-col class="htole-banner" :flex="2">
        <a-affix :offset-top="top">
          <div class="banner-img">
            <!-- <img class="img" src="@/assets/images/login-bg.jpg" alt=""> -->
            <client-only>
              <el-amap class="amap" vid="amapDemo" :zoom="zoom" :center="center"> </el-amap>
            </client-only>
          </div>
          <div>
            <a-button class="search-btn">search</a-button>
          </div>
          <div class="input">
            <a-input placeholder="Basic usage" />
          </div>
          <div class="hotle-info-detail">
            <div class="name">
              "name": "7天连锁酒店(上海宝山路地铁站店)",
            </div>
            <div class="address">"address": "静安交通路40号",</div>
            <div class="price">"price": 336,</div>
            <div class="score">"score": 37,</div>
            <div class="brand"> "brand": "7天酒店",</div>
            <div class="city">"city": "上海",</div>
            <div class="starname">"starName": "二钻",</div>
            <div class="business">"business": "四川北路商业区",</div>
          </div>
        </a-affix>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import General from '@/components/container/General.vue'
import hotelCard from '@/components/card/hotelCard.vue'

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
    }
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
  background-color: rgb(97, 27, 27);
}
.htole-container {
  min-width: 1180px;
  max-width: 1500px;
  width: 90vw;
  margin: auto;
}
.htole-main {
  /* height: 800px; */
  max-width: 900px;
  /* overflow: auto; */
  background: #000;
}
.card-list {
  display: flex;
  flex-wrap: wrap;

  background-color: #fff;
  justify-content: space-between;
  align-items: flex-start;
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
  transform: translate(-50%, -50%);
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