<template>
  <div class="ticket">
    <selectTicket class="search" />
    <a-row class="list">
      <a-col class="col" :span="8">
        <a-skeleton active />
        <!-- <h1>胖乎乎</h1> -->
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
      </a-col>
      <a-col class="col" :span="8">
        <a-skeleton active />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
      </a-col>
      <a-col class="col" :span="8">
        <a-skeleton active />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
        <ticketPrice class="main" />
      </a-col>
    </a-row>
    <h2>78899</h2>

  </div>
</template>

<script>
import ticketPrice from '@/components/card/ticketPrice.vue'
import selectTicket from '@/components/card/selectTicket.vue'
export default {
  layout: 'default',
  components: {
    ticketPrice,
    selectTicket,
  },
}
</script>

<style scoped>
/* .main {
  width: 400px;
  background-color: #ccc;
} */
.search {
  margin-top: 50px;
}
.list {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.col {
  min-width: 300px;
  max-width: 400px;
}
</style>