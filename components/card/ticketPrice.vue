<template>
  <div class="ticketPrice">
    <div class="ticket-top">{{top}}</div>
    <div class="ticket-img">
      <img :src="url" :alt="title">
    </div>
    <div class="tick-info">
      <div class="fromto">{{title}}</div>
      <div>{{time}}</div>
    </div>
    <div class="Price">
      <div>{{price}}$</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    url:String,
    title:String,
    time:String,
    top:Number,
    price:Number
  },
}
</script>

<style scoped>
.ticketPrice {
  cursor: pointer;
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  max-width: 500px;
}
.ticket-top {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: orange;
  font-weight: 800;
  font-size: 20px;
}
.ticket-img {
  width: 87px;
  height: 66px;
  overflow: hidden;
}
.tick-info {
  margin-left: 20px;
  flex: 1;
}
img {
  width: 100%;
  height: 100%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  cursor: pointer;
}
img:hover {
  width: 120%;
  height: 120%;
}
.Price {
  width: 80px;
}
.fromto {
  font-size: 20px;
  font-weight: 500;
}
.fromto:hover {
  color: rgb(206, 229, 255);
}
</style>