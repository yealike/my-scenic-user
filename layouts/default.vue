<template>
  <div>
    <el-backtop>
    </el-backtop>

    <header class="head">
      <div class="head-nav">
        <el-menu mode="horizontal" :router="true"  active-text-color="#22A491FF" text-color="#000" default-active="/">
          <el-menu-item>
            <nuxt-link to="/"><img style="width: 180px" src="~/static/logo.png" alt="旅行者说"></nuxt-link>
          </el-menu-item>
          <el-menu-item index="/" class="nav-font-size">首页</el-menu-item>
          <el-menu-item index="/scenic" class="nav-font-size">景点</el-menu-item>
          <el-menu-item index="3" class="nav-font-size">旅行日记</el-menu-item>
          <el-menu-item index="4" class="nav-font-size">酒店</el-menu-item>
          <el-menu-item>
            <el-input
              placeholder="请输入内容"
              v-model="searchText"
              clearable>
            </el-input>
            <el-button type="primary">搜索</el-button>
          </el-menu-item>


          <el-menu-item style="float: right;">
            <div v-if="!userInfo.id">
              <nuxt-link to="/login" style="color: #22a491;text-decoration: none">登录</nuxt-link>
              |
              <nuxt-link to="/register" style="color: #22a491;text-decoration: none">注册</nuxt-link>
            </div>

            <div v-if="userInfo.id">
              <span>{{ userInfo.username }}</span>
              <img style="width: 50px;border-radius: 50%" :src="userInfo.avatar" alt="头像">
            </div>
          </el-menu-item>


        </el-menu>
      </div>
    </header>

    <!-- 主题显示区域 -->
    <div style="width: 98%;margin: 0 auto">
      <nuxt/>
    </div>
    <!-- 主题显示区域 -->


    <!-- 底部组件 -->
    <footer class="footer">
      <div class="contact">
        <h3>联系作者</h3>
        <img style="width: 100px;" src="~/static/wechat.jpg" alt="联系作者">
      </div>
    </footer>
  </div>
</template>
<script>
import cookie from "js-cookie";
import loginApi from "@/api/member/loginApi";

export default {
  data() {
    return {
      searchText: '',
      userInfo: {
        id: '',
        username: '',
        avatar: '',
        email: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 登录成功之后获取用户信息
    getUserInfo() {
      loginApi.getLoginUserInfo()
        .then(resp => {
          // console.log(resp)
          // 登录成功将用户信息赋值
          this.userInfo.id = resp.data.data.member.id
          this.userInfo.username = resp.data.data.member.username
          this.userInfo.email = resp.data.data.member.email
          if (resp.data.data.member.avatar === null) {
            this.userInfo.avatar = 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c'
          } else {
            this.userInfo.avatar = resp.data.data.member.avatar
          }
          // alert(this.userInfo.id)
        })
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.head {
  background-color: #fff;
  width: 100%;
  padding: 2px;
  display: flex;
  margin-bottom: 30px;
  position: sticky;
  top: 0;
}

.head-nav {
  width: 98%;
  margin: 0 auto;

}

.nav-font-size {
  font-size: 26px;
}


.footer {
  margin-top: 30px;
  margin-bottom: 0;
  width: 100%;
  height: 600px;
  padding: 5px;
  border: black 1px solid;
  background-color: #3C3C3C;
  bottom: 0;
}

.contact {
  width: 100px;
}
</style>
