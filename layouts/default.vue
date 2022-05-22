<template>
  <div>
    <el-backtop>
    </el-backtop>

    <header class="head">
      <div class="head-nav">
        <el-menu mode="horizontal" active-text-color="#22A491FF" text-color="#000" default-active="1">
          <el-menu-item>
            <nuxt-link to="/"><img style="width: 180px" src="~/static/logo.png" alt="旅行者说"></nuxt-link>
          </el-menu-item>
          <el-menu-item index="1" class="nav-font-size">首页</el-menu-item>
          <el-menu-item index="2" class="nav-font-size">景点</el-menu-item>
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
            <nuxt-link to="/login" style="color: #22a491;text-decoration: none">登录</nuxt-link>
            |
            <nuxt-link to="/register" style="color: #22a491;text-decoration: none">注册</nuxt-link>
          </el-menu-item>
        </el-menu>
      </div>
    </header>

    <!-- 主题显示区域 -->
    <nuxt/>
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
export default {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
body{
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
  padding: 5px;
  border: black 1px solid;
  background-color: #3C3C3C;
  bottom: 0;
}

.contact{
  width: 100px;
}
</style>
