<template>
  <nuxt-link to="/person/self">
    <div @click="toggle" class="person-info">
      <!-- <ul class="flot" :class="{'show':show}">
      <li>个人资料</li>
      <li>历史记录</li>
      <li>
        <nuxt-link @click="loginout" to="/signpage">
          退出
        </nuxt-link>
      </li>
    </ul> -->
    </div>
  </nuxt-link>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggle() {
      console.log(123)
      this.show = !this.show
      console.log(this.show)
    },
    loginout() {
      console.log(456)
    },
  },
}
</script>

<style scoped>
.person-info {
  display: inline-block;
  width: 58px;
  height: 30px;
  border-radius: 5px;
  background: #000;
  cursor: pointer;
  position: relative;
}

.flot {
  position: absolute;
  top: 5px;
  right: 0;
  display: none;
  margin-top: 35px;
  list-style: none;
  color: #fff;
  background-color: #000;
  padding: 3px;
  border-radius: 10px;
}

.show {
  display: block;
}

.person-info li {
  border-radius: 10px;
  transition: all 0.2s;
  font-size: 16px;
  font-weight: 800;
  color: rgb(164, 169, 247);
  width: 100px;
  padding: 10px;
  float: left;
  text-align: left;
}

.person-info li:hover {
  background-color: #fff;
}
</style>