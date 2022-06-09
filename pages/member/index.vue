<template>
  <div class="container-lg container-md my-main">
    <div class="row clearfix header">
      <div style="margin-top: 60px; height: 118px" class="row clearfix">
        <div class="col-md-1">
          <img
            :src="userInfo.avatar"
            alt="头像"
            style="width: 80px; height: 80px; border-radius: 50px"
          />
        </div>

        <div class="col-md-9">
          <h4 style="font-size: 36px; color: #2b59cb; font-family: 楷体">
            {{ userInfo.username }}
          </h4>
          <span style="font-size: 14px; font-family: 'Arial Black', serif">{{
            userInfo.intro
          }}</span>
        </div>

        <div class="col-md-2">
          <h4 style="color: #2b59cb">
            粉丝: <span style="color: #132edc">{{ userInfo.fans }}</span>
          </h4>
          <h4 style="color: #2b59cb">
            关注: <span style="color: #132edc">{{ userInfo.focus }}</span>
          </h4>
          <h4 style="color: #2b59cb">
            创作:
            <span style="color: #132edc">{{ userInfo.articalCount }}</span>
          </h4>
        </div>
      </div>
    </div>

    <!-- 主体部分 -->
    <div class="row clearfix" style="margin-top: 20px">
      <!-- 左侧主体 -->
      <div class="col-md-9">
        <div class="container-md container-lg left-main">
          <div class="my-tab" style="display: flex">
            <span style="font-size: 30px; font-family: 方正粗黑宋简体"
              >我的作品
            </span>
            <span style="color: #1badb6; margin-left: 20px; margin-right: 20px">
              {{ pageInfo.total }}</span
            >

            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="最新发布" name="first"></el-tab-pane>
              <el-tab-pane label="最多点赞" name="second"></el-tab-pane>
              <el-tab-pane label="最多浏览" name="third"></el-tab-pane>
            </el-tabs>
          </div>

          <el-empty
            v-if="!articleList"
            description="空空如也"
            :image-size="500"
          ></el-empty>

          <!-- 缩略图 -->
          <div class="row">
            <div
              class="col-md-3"
              style="margin: 10px 0 10px 0"
              v-for="item in articleList"
            >
              <div class="thumbnail thu-item">
                <img
                  style="width: 100%; border-radius: 6px; height: 130px"
                  :alt="item.title"
                  :src="item.cover"
                />
                <div class="thu-font">
                  <span
                    >{{
                      item.title
                    }}在读生/没学过但爱唱歌的小邓在此！欢迎来我的网易云-邓园长这儿听歌！微博：动物园邓园长
                    快乐扣群：980248279</span
                  >
                </div>
                <div style="padding-left: 10px">
                  <img
                    src="~/static/浏览量.png"
                    style="width: 30px; height: 30px"
                    alt="浏览："
                    title="浏览量"
                  />{{ item.viewCount }}
                  <img
                    src="~/static/点赞_块.png"
                    style="width: 20px; height: 20px; margin-left: 20%"
                    alt="点赞："
                    title="点赞"
                  />{{ item.praiseCount }}
                </div>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="page-helper">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.current"
              :page-sizes="[8, 12, 24, 36]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <div class="col-md-3">
        <!-- 卡片组件 -->
        <el-card class="box-card" style="margin-top: 30px">
          <div slot="header" class="clearfix">
            <span>个人资料</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showUpdate"
              >修改</el-button
            >
          </div>
          <div class="text item">
            <h6>
              性别: <span>{{ userInfo.gender == 1 ? '男' : '女' }}</span>
            </h6>
            <h6>
              邮箱: <span>{{ userInfo.email }}</span>
            </h6>
            <h6>
              生日: <span>{{ userInfo.birth }}</span>
            </h6>
          </div>
        </el-card>

        <el-card class="box-card" style="margin-top: 30px">
          <div slot="header" class="clearfix">
            <span>新品创作</span>
          </div>
          <div style="display: flex">
            <h4>创作</h4>
            <nuxt-link to="/edit">
              <img
                src="~/static/create.png"
                style="width: 20px; height: 20px; margin-left: 10px"
                alt="创作"
              />
            </nuxt-link>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 对话框，用于修改用户信息 -->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="updateInfo" label-width="80px">
        <el-form-item label="用户名">
          <el-input
            v-model="updateInfo.username"
            clearable
            autocomplete="off"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select v-model="updateInfo.gender" placeholder="选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="头像">
          <el-image
            style="border-radius: 5px; width: 150px; height: 100px"
            fit="fit"
            :src="updateInfo.avatar"
          >
          </el-image>
          <!-- 图片上传组件 -->
          <el-upload
            style="
              display: inline-block;
              margin-left: 10px;
              vertical-align: bottom;
            "
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
          <el-input
            v-model="updateInfo.intro"
            :maxlength="125"
            placeholder="简介"
          ></el-input>
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
import member from '@/api/user'
import articleApi from '@/api/article'

export default {
  name: 'index',
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
        articalCount: '',
      },
      updateInfo: {
        id: '',
        username: '',
        avatar: '',
        birth: '',
        gender: '',
        intro: '',
      },
      // 头像上传地址
      imageUrl: 'http://localhost:88/scenic/scenic/oss',
      pageInfo: {
        userId: '',
        current: 1,
        limit: 8,
        total: '',
      },
      articleList: [],
      activeName: 'second',
    }
  },
  beforeMount() {},
  mounted() {
    // this.$refs.stu.$on('editor', this.getContent)
    // let str = localStorage.getItem('userInfo')
    // if (str == '' || str == null || str == undefined) {
    //   console.log(
    //     '获取用户信息失败,不存在键为userInfo的localStorage==>member.vue'
    //   )
    // } else {
    //   this.userInfo = JSON.parse(str)
    //   // console.log(this.userInfo)
    // }
    // console.log(this.userInfo)
    // 初始化作品数据
    // if (this.userInfo.id) {
    //   this.articleInit(this.userInfo.id, 1, 8)
    // }
    // this.articleInit(this.pageInfo.userId,this.pageInfo.limit,this.pageInfo.limit)
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
      member.updateById(this.updateInfo).then((resp) => {
        if (resp.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功！',
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
    },
    // 获取我的创作作品--页面初始化
    articleInit(userId, current, limit) {
      articleApi
        .getArticleByUserIdWithPage(userId, current, limit)
        .then((resp) => {
          this.articleList = resp.data.data.info.records
          console.log(resp)
          this.pageInfo.total = resp.data.data.info.total
          this.pageInfo.current = resp.data.data.info.current
          this.pageInfo.limit = resp.data.data.info.size

          console.log(this.pageInfo)
          // console.log('文章数据',this.articleList)
        })
        .catch((err) => {
          console.log('获取作品数据失败==>', err)
        })
    },
    // 页面大小发生变化
    handleSizeChange(val) {
      this.articleInit(this.userInfo.id, 1, val)
    },
    // 页码发生变化
    handleCurrentChange(val) {
      this.articleInit(this.userInfo.id, val, this.pageInfo.limit)
    },
  },
}
</script>

<style scoped>
.my-main {
  min-height: 1000px;
  border-radius: 5px;
  /*box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4), 0 3px 6px 0 rgba(0, 0, 0, 0.6);*/
}

.header {
  height: 179px;
  background-image: url(./static/background.png);
  border-radius: 6px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.1);
}

.thu-item {
  /*border: #4e4e4e 1px solid;*/
  /*padding: 5px 0 5px 0;*/
  border-radius: 3px;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);*/
}

.thu-item:hover {
  /*border: #4e4e4e 1px solid;*/
  /*padding: 5px 0 5px 0;*/
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.1);
}

.thu-font {
  margin-top: 3px;
  color: #0e6de8;
  font-family: 'UD Digi Kyokasho N-R';
  line-height: 1.2em;
  font-size: 16px;
  /*padding: 6px;*/
  padding-left: 6px;
  /*border: #4e4e4e 1px solid;*/
  height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.page-helper {
  padding: 0;
  margin-top: 30px;
  text-align: center;
  /*border: solid 1px #000000;*/
  margin-bottom: 20px;
}
.left-main {
  /*border: #4e4e4e 1px solid;*/
  /*margin-top: 20px;*/
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.1);
}
</style>
