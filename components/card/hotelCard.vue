<template>
  <a-card class="margin" hoverable style="width: 230px">
    <img
      slot="cover"
      alt="example"
      :src="url ? url : '@/assets/images/login-bg.jpg'"
    />
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
.price {
  margin: 0;
  color: orange;
}
</style>
