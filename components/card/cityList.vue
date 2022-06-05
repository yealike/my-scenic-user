<template>
  <ul class="citylist">
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
    <li>长春</li>
    <li>经济</li>
    <li>看看</li>
  </ul>
</template>

<script>
export default {
  props: {
    citylist: [],
  },
}
</script>

<style scoped>
.citylist {
  overflow-y: hidden;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  /* background-color: #ccc; */
  margin-top: 20px;
}
.citylist::-webkit-scrollbar {
  width: 0 !important;
}
.citylist li {
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  list-style: none;
  margin: 15px 14px 0;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  white-space: nowrap;
  background-color: #ddd;
  border-radius: 25px;
  transition: all 0.3s;
}
.citylist li:hover {
  background-color: #eee;
  color: orange;
}
</style>