<template>
  <a-card class="margin" hoverable style="width: 230px">
    <div class="img-box">
      <img
        slot="cover"
        alt="example"
        :src="url ? url : '@/assets/images/login-bg.jpg'"
      />
    </div>
    <template slot="actions" class="ant-card-actions">
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta :title="title" :description="address"></a-card-meta>
    <h1 class="price">{{ price }}$</h1>
  </a-card>
</template>
<script>
export default {
  props: {
    id: Number,
    title: String,
    address: String,
    price: Number,
    url: String,
  },
  methods: {},
}
</script>

<style scoped>
.margin {
  margin: 5px 0;
  z-index: 999;
}
.img-box {
  border-radius: 5px;
  overflow: hidden;
  width: 180px;
  height: 180px;
  overflow: hidden !important;
  position: relative;
}
img {
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.margin:hover img {
  width: 110%;
  width: 110%;
  object-fit: cover;
}
.price {
  margin: 0;
  color: orange;
}
</style>
