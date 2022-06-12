<template>
  <div class="person-bg" :style="bgstyle">
    <div class="avatar">
      <nuxt-link to="/home"
        ><img :src="userInfo.avatar ? userInfo.avatar : defaultImg"
      /></nuxt-link>
    </div>
    <div class="no-chili">{{ userInfo.username }}</div>
    <a-button v-if="isSelf" class="setting" @click="showSetting">设置</a-button>
    <a-button v-if="isSelf" class="setting" @click="loginOut">退出</a-button>
    <a-button v-if="!isSelf" class="setting" @click="toggleFollow">{{
      followed
    }}</a-button>
    <div>粉丝:{{ followInfo.fansCount }} 关注:{{ followInfo.focusCount }}</div>
    <div class="introduct">{{ userInfo.intro }}</div>
    <div v-if="isSelf" class="tags">
      <nuxt-link to="/edit">
        <div class="tag">写日记</div>
      </nuxt-link>
      <div @click="showHistory" class="tag">浏览历史</div>
      <!-- <div @click="showLike" class="tag">我的收藏</div> -->
    </div>
    <div class="link">
      <div>
        <a-icon class="item" type="github" />
      </div>
      <div>
        <a-icon class="item" type="zhihu" />
      </div>
    </div>
    <a-drawer :placement="placement" height width :closable="false" :visible="visible" @close="onClose">
      <div class="form-layout">
        <a-form class="form-main" v-show="type == 'setting'" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
          <a-row>
            <a-col :span="8">
              <a-form-item label="id">
                <a-input v-model="userInfo.id" disabled />
              </a-form-item>
              <a-form-item label="username">
                <a-input v-model="userInfo.username" />
              </a-form-item>
              <a-form-item label="intro">
                <a-input v-model="userInfo.intro" />
              </a-form-item>
              <a-form-item label="birth">
                <a-date-picker :defaultValue="userInfo.birth" @change="changeDate" />
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                  保存修改
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Gender">
                <a-select v-model="G" placeholder="Select a option and change input text above" @change="handleSelectChange">
                  <a-select-option value="1"> 男 </a-select-option>
                  <a-select-option value="0"> 女 </a-select-option>
                </a-select>
              </a-form-item>
              <!-- <a-form-item label="password">
                <a-input v-model="userInfo.password" />
              </a-form-item> -->
            </a-col>
            <a-col :span="8">
              头像
              <a-upload
                name="file"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="`${BASE_URL}/scenic/upload/image`"
                :before-upload="beforeAvatarUpload"
                @change="avatarChange"
              >
                <img
                  v-if="userInfo.avatar"
                  :src="userInfo.avatar"
                  alt="avatar"
                />
                <div v-else>
                  <a-icon :type="avatarloading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              自定义背景
              <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="#" :before-upload="beforeBGUpload" @change="bgChange">
                <img v-if="bgUrl" :src="bgUrl" />
                <div v-else>
                  <a-icon :type="bgloading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-button @click="back" class="back" type="primary"
                >恢复默认壁纸</a-button
              >
            </a-col>
          </a-row>
        </a-form>
        <div v-show="type == 'like'">
          <lickCard
            v-for="item in colleList"
            :key="item.id"
            :url="item.link"
            :title="item.title"
            :tag="item.tag"
          />
        </div>
        <div v-show="type == 'history'">
          <lickCard v-for="item in historyList" :key="item.id" :url="item.link" :title="item.title" :tag="item.tag" />
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import lickCard from '@/components/card/lickCard.vue'
import user from '@/api/user'
import Cookies from 'js-cookie'
import env from '@/env'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  layout: 'sign',
  components: {
    lickCard,
  },
  data() {
    return {
      //性别
      G: '',
      //关注信息
      followInfo: {
        focused: false,
        focusCount: 0,
        fansCount: 0,
      },
      user: {},

      form: {},
      placement: 'top',
      visible: false,
      type: 'setting', //setting|history|like|follow
      height: 500,
      width: 400,

      bgloading: false,
      bgUrl: '',
      avatarloading: false,

      imageUrl: '',
      userInfo: {},

      historyList: [],
      colleList: [],
    }
  },
  methods: {
    back() {
      window.localStorage.removeItem('bgUrl')
      this.bgUrl = null
    },
    showSetting() {
      this.placement = 'top'
      this.visible = true
      this.type = 'setting' //setting|history|like|follow
    },
    showHistory() {
      this.fetHistory()
      this.placement = 'left'
      this.visible = true
      this.type = 'history' //setting|history|like|follow
    },
    showLike() {
      this.placement = 'left'
      this.visible = true
      this.type = 'like' //setting|history|like|follow
      this.fetchCollect()
    },
    showFollow() {
      this.placement = 'left'
      this.visible = true
      this.type = 'follow' //setting|history|like|follow
    },
    onClose() {
      this.visible = false
    },
    onChange(e) {
      this.placement = e.target.value
    },
    beforeAvatarUpload(e) {
      console.log(e)
    },
    avatarChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.userInfo.avatar = info.file.response.data.url
      }
    },
    beforeBGUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    bgChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        new Image()
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.bgUrl = imageUrl
          window.localStorage.setItem('bgUrl', this.bgUrl)
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    async fetchUserInfo() {
      const id = this.$route.params.id
      console.log('iiiddd', id)
      const localid = window.localStorage.getItem('user')
        ? JSON.parse(window.localStorage.getItem('user')).id
        : null
      if (this.isSelf) {
        console.log('self')
        const { data: res } = await user.getUserInfoById(localid, localid)
        this.userInfo = res.member
        this.followInfo.focusCount = res.focusCount
        this.followInfo.fansCount = res.fansCount
        this.followInfo.focused = res.focused
        this.visible = false
        console.log('my', this.userInfo)
      } else {
        console.log('other')
        //获取查看对象info
        const { data: res } = await user.getUserInfoById(id, localid)
        this.userInfo = res.member
        console.log('otherinfo', this.userInfo)
        this.followInfo.focusCount = res.focusCount
        this.followInfo.fansCount = res.fansCount
        this.followInfo.focused = res.focused
        console.log(99, res)
        const history = {
          link: window.location.href,
          tag: '主页',
          tagId: this.userInfo.id,
          title: this.userInfo.username,
          userId: this.user.id,
        }
        if (this.user.id) {
          user.addHistory(history)
        }
      }
      console.log('456', this.followInfo.focused)
      this.G = this.userInfo.gender == 1 ? '男' : '女'
    },
    async fetHistory() {
      const { data: res } = await user.getHistory(this.userInfo.id, 1, 10)
      this.historyList = res.records
    },
    async fetchCollect() {
      console.log('collect')
      console.log(this.userInfo.id)
      const { data: res } = await user.fetchCollectList(this.userInfo.id, 1, 10)
      this.colleList = res.records
      //  不知道数据格式
      // console.log(res)
      // console.log(this.colleList)
    },
    async fetchFollow() {
      //获取自己的ID
      const MID = this.user.id
      // 获取对方ID
      const UID = this.userInfo.id
      //获取关注
      const { data: res } = await user.fetchFollow(UID, MID)
      //赋值关注信息
      // this.followInfo = res
      console.log(888, res)
    },
    async toggleFollow() {
      //获取自己的ID
      const MID = this.user.id
      // 获取对方ID
      const UID = this.userInfo.id

      console.log(MID, UID)
      //发请求
      const { data: res } = await user.toggleFollow(UID, MID)
      console.log(789546, res)
      this.followInfo.focused = res.isFocus
      //重新获取
      // this.fetchFollow()
      this.fetchUserInfo()
    },
    async handleSubmit(e) {
      e.preventDefault()
      // console.log(this.userInfo.birth._i)
      // const userInfo = this.userInfo
      console.log(this.userInfo.birth)
      this.userInfo.birth = this.userInfo.birth._i

      console.log('userInfo', this.userInfo)
      const { data: res } = await user.updateById(this.userInfo)
      console.log(res)
      this.visible = false
      await this.fetchUserInfo()
      Cookies.set('user', JSON.stringify(this.userInfo))
    },
    async handleSelectChange(e) {
      this.userInfo.gender = e
      console.log(e)
      console.log(this.userInfo.gender)
    },
    // 退出
    loginOut() {
      window.localStorage.clear()
      this.$router.push('/home')
      this.$store.commit('loginout')
      Cookies.set('logined', false)
    },
    changeDate(e) {
      const year = e._d.getFullYear()
      const month = e._d.getMonth() + 1
      const birth =
        year +
        '-' +
        (month / 10 > 0 ? '0' + month : month) +
        '-' +
        (e._d.getDate() / 10 > 0 ? e._d.getDate() : '0' + e._d.getDate())
      console.log(birth)
    },
  },
  computed: {
    isSelf() {
      // const id = this.$route.params.id
      // const lid = Cookies.getItem('user')
      //   ? JSON.parse(window.localStorage.getItem('user')).id
      //   : null
      return this.$route.params.id == 'self'
    },
    bgstyle() {
      return {
        backgroundImage: this.bgUrl
          ? `url(${this.bgUrl})`
          : `url(${require('../../assets/images/login-bg.jpg')})`,
      }
    },
    followed() {
      return this.followInfo.focused ? '已关注' : '关注'
    },
    BASE_URL() {
      return env.dev.BASE_URL
    },
    defaultImg() {
      return require('@/assets/images/icon (1).png')
    },
  },
  mounted() {
    this.fetchUserInfo()
    if (window.localStorage.getItem('bgUrl')) {
      this.bgUrl = window.localStorage.getItem('bgUrl')
    }
    this.user = window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user'))
      : null
    this.fetchFollow()
  },
}
</script>

<style scoped>
.person-bg {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/login-bg.jpg');
  background-size: cover;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.person-bg div {
  margin-top: 10px;
}
.avatar {
  width: 100px;
  height: 100px;
  border: 5px solid #fff;
  border-radius: 50%;
  overflow: hidden;
  transition: all 1s;
  animation: border 1s linear infinite;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s;
}
.setting {
  width: 80px;
  height: 30px;
  margin-bottom: 10px;
  border: 3px solid #fff;
  background-color: transparent;
  color: #fff;
  border-radius: 30px;
}
.introduct {
  font-size: 18px;
  font-weight: 500px;
}
.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tag {
  height: 30px;
  border: 3px solid #fff;
  background-color: transparent;
  color: #fff;
  border-radius: 30px;
  padding: 5px 10px;
  text-align: center;
  line-height: 15px;
  margin: 0 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.tag:hover {
  border: 5px solid #fff;
  line-height: 10px;
}
.no-chili {
  font-size: 20px;
  font-weight: 800;
}
.link {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
}
.link .item {
  margin: 0 20px;
  cursor: pointer;
}
.logout {
  position: absolute;
  top: 50xp;
  right: 50px;
}
.form-layout {
  width: 100%;
}
</style>
