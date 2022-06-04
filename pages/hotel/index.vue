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
          <img class="banner-img" src="@/assets/images/login-bg.jpg" alt="">
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
  margin-left: 20px;
  border-radius: 5px;
}
</style>