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
      </a-col>
    </a-row>
  </div>
</template>

<script>
import scenic from '~/pages/scenic'
import TEditor from '@/components/TEditor'
import cityList from '@/components/card/cityList.vue'
import infoCard from '@/components/card/infoCard.vue'
export default {
  layout: 'default',
  name: 'IndexPage',
  components: { scenic, TEditor, cityList, infoCard },
}
</script>
<style  scoped>
.indexpage {
  width: 85vw;
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
  height: 600px;
}
</style>
