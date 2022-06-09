<template>
  <div>
    <nuxt-link v-if="logined" to="/person/self">
      <div class="person-info">
        <img :src="user.avatar" alt="" />
      </div>
    </nuxt-link>
    <a-button v-if="!logined" type="link">
      <nuxt-link to="/signpage"> 登录 </nuxt-link>
    </a-button>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  data() {
    return {
      logined: false,
      user: {},
    }
  },
  methods: {
    getLogined() {
      this.logined = cookie.get('logined') == 'true'
    },
    getUser() {
      this.user = cookie.get('user') ? JSON.parse(cookie.get('user')) : {}
    },
  },
  mounted() {
    this.getLogined()
    this.getUser()
  },
}
</script>

<style scoped>
.person-info {
  display: inline-block;
  width: 58px;
  height: 30px;
  border-radius: 5px;
  /* background: #000; */
  cursor: pointer;
  position: relative;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
