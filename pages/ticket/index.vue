<template>
  <div class="ticket container">
    <selectTicket class="search" />
    <a-row class="list">
      <a-col class="col" :span="8">
        <a-skeleton v-if="ticketListIsEmpty" active />
        <!-- <h1>胖乎乎</h1> -->
        <ticketPrice v-if="!ticketListIsEmpty" class="main" />
        <ticketPrice
          title="from 789 to 789"
          :top="1"
          url="456"
          time="2000-10-8"
          :price="1000"
          class="main"
        />
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
  data() {
    return {
      ticketList: [],
      from: '',
      to: '',
      type: '',
      date: '',
    }
  },
  methods: {
    //初始化
    fetch() {},
    search() {},
  },
  computed: {
    ticketListIsEmpty() {
      return this.ticketList.length <= 0
    },
  },
}
</script>

<style scoped>
/* .main {
  width: 400px;
  background-color: #ccc;
} */
.container {
  max-width: 1350px;
  margin: auto;
}
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
