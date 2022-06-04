<template>
  <a-card class="margin" hoverable style="width: 230px">
    <img slot="cover" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
    <template slot="actions" class="ant-card-actions">
      <!-- <a-icon key="setting" type="setting" />
      <a-icon key="edit" type="edit" /> -->
      <a-icon key="ellipsis" type="ellipsis" />
    </template>
    <a-card-meta title="Hotle-name" description="address"></a-card-meta>
    <h1 class="price">price 89</h1>
  </a-card>
</template>
<script>
export default {}
</script>

<style scoped>
.margin {
  margin: 5px 0;
}
.price {
  margin: 0;
  color: orange;
}
</style>