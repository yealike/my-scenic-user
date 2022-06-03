<template>
  <div id="navbar">
    <div id="logo">
      <span class="logo-icon no-wrap">logo-travel</span>
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item v-for="item in menus" :key="item.path">
          <nuxt-link :to="item.path">{{item.title}}</nuxt-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div id="search">
      <a-input-search v-model="searchKey" placeholder="input search text" style="width: 200px" @search="onSearch" />
    </div>
    <div class="no-wrap">
      <a-button type="link">
        <nuxt-link @click="loginout" to="/signpage">{{logined?'退出':'登录'}}</nuxt-link>
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: '',
      current: ['mail'],
      menus: [
        {
          path: '/',
          title: '首页',
        },
        {
          path: '/scenic',
          title: '景点',
        },
        {
          path: '/journal',
          title: '旅行日记',
        },
        {
          path: '/hotel',
          title: '酒店',
        },
      ],
    }
  },
  methods: {
    onSearch() {
      //搜索请求
    },
    loginout() {
      if (this.logined) {
        //清除用户消息
      }
      return
    },
  },
  created() {
    // this.$store.commit('login')
  },
  computed: {
    logined() {
      return this.$store.getters.getLogined
    },
  },
}
</script>

<style scoped>
.no-wrap {
  white-space: nowrap;
}
#navbar {
  font-size: 18px;
  font-weight: 500;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
#navbar #logo {
  display: flex;
  line-height: 50px;
}
#search {
  flex: 1;
  text-align: left;
  margin-left: 50px;
}
@media screen and (max-width: 850px) {
  #search {
    display: none;
  }
}
@media screen and (max-width: 570px) {
  #navbar {
    padding: 0;
  }
  .logo-icon {
    display: none;
  }
}
@media screen and (max-width: 480px) {
  .no-wrap {
    display: none;
  }
}
</style>