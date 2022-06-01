<template>
  <div class="container-lg container-md my-main" style="border: #4e4e4e 1px solid">
    <div class="row clearfix header">
      <div style="margin-top: 60px;height: 118px" class="row clearfix">

        <div class="col-md-1">
          <img :src="userInfo.avatar" alt="头像" style="width: 80px;height: 80px;border-radius: 50px">
        </div>

        <div class="col-md-9">
          <h4 style="font-size: 36px;color: #2b59cb;font-family: 楷体">{{ userInfo.username }}</h4>
          <span style="font-size: 14px;font-family: 'Arial Black',serif">{{ userInfo.intro }}</span>
        </div>

        <div class="col-md-2">
          <h4 style="color: #2b59cb">粉丝: <span style="color: #132edc">{{ userInfo.fans }}</span></h4>
          <h4 style="color: #2b59cb">关注: <span style="color: #132edc">{{ userInfo.focus }}</span></h4>
          <h4 style="color: #2b59cb">创作: <span style="color: #132edc">{{ userInfo.articalCount }}</span></h4>
        </div>

      </div>
    </div>

    <!-- 主体部分 -->
    <div class="row clearfix" style="margin-top: 20px">
      <!-- 左侧主体 -->
      <div class="col-md-9">
        <div class="container-md container-lg" style="border: #4e4e4e 1px solid;border-radius: 5px">
          <h3 style="margin-top: 20px;margin-left: 20px">我的作品</h3>
          <el-empty description="空空如也" :image-size="500"></el-empty>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <div class="col-md-3">
        <!-- 卡片组件 -->
        <el-card class="box-card" style="margin-top: 30px">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="showUpdate">修改</el-button>
          </div>
          <div class="text item">
            <h6>性别: <span>{{ userInfo.gender == 1 ? '男' : '女' }}</span></h6>
            <h6>邮箱: <span>{{ userInfo.email }}</span></h6>
            <h6>生日: <span>{{ userInfo.birth }}</span></h6>
          </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 30px">
          <div slot="header" class="clearfix">
            <span>新品创作</span>
          </div>
          <div style="display: flex">
            <h4>创作</h4>
            <nuxt-link to="/edit">
              <img src="~/static/create.png" style="width: 20px;height: 20px;margin-left: 10px" alt="创作"></nuxt-link>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 对话框，用于修改用户信息 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
               :close-on-press-escape="false">

      <el-form :model="updateInfo" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="updateInfo.username" clearable autocomplete="off" placeholder="输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="updateInfo.gender" placeholder="选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="头像">
          <el-image
            style="border-radius: 5px;width: 150px;height: 100px;"
            fit="fit"
            :src="updateInfo.avatar"
          >
          </el-image>
          <!-- 图片上传组件 -->
          <el-upload
            style="display: inline-block;margin-left: 10px;vertical-align: bottom;"
            :action="imageUrl"
            list-type="picture-card"
            :on-success="uploadImage"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="出生日期">
          <el-date-picker
            v-model="updateInfo.birth"
            type="date"
            @change="dateChange"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="updateInfo.intro" :maxlength="125" placeholder="简介"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import member from "@/api/member/member";


export default {
  name: "index",
  layout: 'default',

  data() {
    return {
      dialogFormVisible: false,
      userInfo: {
        username: '',
        avatar: '',
        birth: '',
        email: '',
        fans: '',
        focus: '',
        gender: '',
        id: '',
        intro: '',
        articalCount: ''
      },
      updateInfo: {
        id: '',
        username: '',
        avatar: '',
        birth: '',
        gender: '',
        intro: ''
      },
      // 头像上传地址
      imageUrl: 'http://localhost:88/scenic/scenic/oss'
    }
  },
  beforeMount() {

  },
  mounted() {

    // this.$refs.stu.$on('editor', this.getContent)

    let str = localStorage.getItem('userInfo')
    if (str == '' || str == null || str == undefined) {
      console.log('获取用户信息失败，不存在键为userInfo的localStorage==>member.vue')
    } else {
      this.userInfo = JSON.parse(str)
      // console.log(this.userInfo)
    }
  },
  methods: {
    // 图片上传成功之后的回调
    uploadImage(resp) {
      this.updateInfo.avatar = resp.data.url
    },
    // 显示修改对话框
    showUpdate() {
      this.dialogFormVisible = true
      this.updateInfo.id = this.userInfo.id
      this.updateInfo.username = this.userInfo.username
      this.updateInfo.avatar = this.userInfo.avatar
      this.updateInfo.birth = this.userInfo.birth
      this.updateInfo.gender = this.userInfo.gender
      this.updateInfo.intro = this.userInfo.intro

    },
    // 修改用户信息
    submitUpdate() {
      member.updateById(this.updateInfo)
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            // 修改成功，刷新页面
            window.location.reload()
          } else {
            this.$message.error('修改失败')
          }
        })
    },
    // 时间改变--修复原生时间选择器传到后端减一天的bug
    dateChange(date) {
      // this.updateInfo.birth = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
      const date2 = new Date()
      date.setHours(date2.getHours())
      date.setMinutes(date2.getMinutes())
      date.setSeconds(date2.getSeconds())
      // console.log(date)
      this.updateInfo.birth = date
      // console.log(date2)
    },
    getContent(con) {
      this.content = con
    }
  }
}
</script>

<style scoped>
.my-main {
  min-height: 1000px;
  border-radius: 5px;
}

.header {
  height: 179px;
  background-image: url(./static/background.png);
  border-radius: 6px;
}
</style>
