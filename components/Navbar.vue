<template>
  <div id="navbar">
    <div id="logo">
      <span class="logo-icon no-wrap">
        <nuxt-link to="/home"
          ><img class="logo-img" src="@/assets/images/logo.png" alt=""
        /></nuxt-link>
      </span>
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item v-for="item in menus" :key="item.path">
          <nuxt-link :to="item.path">{{ item.title }}</nuxt-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div id="search">
      <a-input-search
        v-model="searchKey"
        placeholder="在这里查找景点"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <div class="no-wrap">
      <PersonInfo :logined="logined" />
    </div>
  </div>
</template>

<script>
import PersonInfo from '@/components/PersonInfo'
import scenicApi from '@/api/scenic'
export default {
  components: { PersonInfo },
  props: {
    logined: String,
  },
  data() {
    return {
      searchKey: '',
      current: [''],
      menus: [
        {
          path: '/home',
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
        // {
        //   path: '/ticket',
        //   title: '机票',
        // },
      ],
    }
  },
  methods: {
    async onSearch() {
      //搜索请求
      const { data: res } = await scenicApi.fetchByKeyName(
        1,
        10,
        this.searchKey
      )
      console.log(res.records)
      this.$store.commit('addScenicList', res.records)
      this.$router.push('/scenic')
      this.current = ['/scenic']
    },
  },
}
</script>

<style scoped>
.no-wrap {
  white-space: nowrap;
}
.ant-btn {
  width: 80px;
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
.logo-img {
  width: 90px;
  height: 50px;
  object-fit: contain;
}
</style>
