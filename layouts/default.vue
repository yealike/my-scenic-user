<template>
  <div>
    <el-backtop>
    </el-backtop>

    <header class="head">
      <div class="head-nav">
        <el-menu mode="horizontal" :router="true" active-text-color="#22A491FF" text-color="#000" default-active="/">
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

            <!--            <div v-if="userInfo.id">-->
            <!--              <span>{{ userInfo.username }}</span>-->
            <!--              <img style="width: 50px;border-radius: 50%" :src="userInfo.avatar" alt="头像">-->
            <!--            </div>-->

            <el-dropdown v-if="userInfo.id">
                <span>{{ userInfo.username }}
                  <img style="width: 50px;border-radius: 50%" :src="userInfo.avatar" alt="头像">
                </span>
              <el-dropdown-menu>
                <div style="width: 200px;height: 180px;">
                  <ul class="list">
                    <li>{{ userInfo.username }}</li>
                    <li>
                      <nuxt-link to="/member">个人中心</nuxt-link>
                    </li>
                    <li @click="logout">退出登录</li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>


        </el-menu>
      </div>
    </header>

    <!-- 主题显示区域 -->
    <div style="width: 98%;margin: 0 auto;min-height: 1000px">
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
        email: '',
        articalCount: '',
        birth: '',
        fans: '',
        focus: '',
        gender: '',
        intro: '',
        gmtCreate: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 登录成功之后获取用户信息
    getUserInfo() {
      // loginApi.getLoginUserInfo()
      //   .then(resp => {
      //     // console.log(resp)
      //     // 登录成功将用户信息赋值
      //     this.userInfo = resp.data.data.member
      //     // this.userInfo.id = resp.data.data.member.id
      //     // this.userInfo.username = resp.data.data.member.username
      //     // this.userInfo.email = resp.data.data.member.email
      //     if (resp.data.data.member.avatar == null || resp.data.data.member.avatar == '') {
      //       this.userInfo.avatar = ''
      //       // this.userInfo.avatar = 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c'
      //     } else {
      //       this.userInfo.avatar = resp.data.data.member.avatar
      //     }
      //     cookie.set('userInfo', JSON.stringify(this.userInfo))
      //   })

      // 如果存在travel_token那么发送查询用户信息的请求，如果不存在，那么就不发送请求
      const token = cookie.get('travel_token')
      if (token == '' || token == null || token == undefined) {
        // token为空不发送获取用户信息的请求
        console.log('获取用户信息时token==>为空,不发送网络请求default.vue')
      } else {
        // token不为空，发送请求获取用户信息
        loginApi.getLoginUserInfo()
          .then(resp => {
            console.log('用户信息获取成功！==>default')
            if (resp.data.success) {
              this.userInfo.id = resp.data.data.member.id
              this.userInfo.username = resp.data.data.member.username
              this.userInfo.avatar = resp.data.data.member.avatar
              this.userInfo.email = resp.data.data.member.email
              this.userInfo.articalCount = resp.data.data.member.articalCount
              this.userInfo.birth = resp.data.data.member.birth
              this.userInfo.fans = resp.data.data.member.fans
              this.userInfo.focus = resp.data.data.member.focus
              this.userInfo.gender = resp.data.data.member.gender
              this.userInfo.intro = resp.data.data.member.intro
              this.userInfo.gmtCreate = resp.data.data.member.gmtCreate
              // 将用户信息转为字符串，放到cookie里面
              // cookie.set('userInfo', JSON.stringify(this.userInfo))
              localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            } else {
              console.log('获取token之后，获取用户信息失败')
            }
          })
          .catch(err => {
            console.log('获取用户信息失败，错误信息==>', err)
          })
      }
    },
    // 退出登录-->删除cookie,直接回到主页
    logout() {
      cookie.remove('travel_token')
      localStorage.removeItem('userInfo')
      window.location.href = '/'
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
  height: 300px;
  padding: 5px;
  border: black 1px solid;
  background-color: #3C3C3C;
  bottom: 0;
  border-top: #107067 4px solid;
}

.contact {
  width: 300px;
}

.list {
  padding: 20px;
}

.list li {
  list-style: none;
  margin-top: 10px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
}

.list li:hover {
  background-color: #d7cbcb;
}
</style>
