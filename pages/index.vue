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
  </div>
</template>

<script>
import scenic from '~/pages/scenic'
import TEditor from '@/components/TEditor'

export default {
  layout: 'default',
  name: 'IndexPage',
  components: { scenic, TEditor },
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
</style>
