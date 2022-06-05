<template>
  <div class="person-bg">
    <div class="avatar">
      <nuxt-link to="/"><img src="@/assets/images/login-bg.jpg" alt=""></nuxt-link>
    </div>
    <div class="no-chili">no-chili</div>
    <a-button class="setting" @click="showSetting">setting</a-button>
    <div>粉丝:789 关注:897</div>
    <div class="introduct">百度翻译-200种语言互译、沟通全世界！</div>
    <div class="tags">
      <nuxt-link to="/edit">
        <div class="tag">写日记</div>
      </nuxt-link>
      <div @click="showHistory" class="tag">浏览历史</div>
      <div @click="showLike" class="tag">我的收藏</div>
    </div>
    <div class="link">
      <div>
        <a-icon class="item " type="github" />
      </div>
      <div>
        <a-icon class="item " type="zhihu" />
      </div>
    </div>
    <a-drawer :placement="placement" height width :closable="false" :visible="visible" @close="onClose">
      <div class="form-layout">
        <a-form class="form-main" v-show="type=='setting'" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
          <a-row>
            <a-col :span="8">
              <a-form-item label="Note">
                <a-input v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="Gender">
                <a-select v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                  <a-select-option value="male">
                    male
                  </a-select-option>
                  <a-select-option value="female">
                    female
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Gender">
                <a-select v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                  <a-select-option value="male">
                    male
                  </a-select-option>
                  <a-select-option value="female">
                    female
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Gender">
                <a-select v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                  <a-select-option value="male">
                    male
                  </a-select-option>
                  <a-select-option value="female">
                    female
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" html-type="submit">
                  Submit
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Note">
                <a-input v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]" />
              </a-form-item>
              <a-form-item label="Gender">
                <a-select v-decorator="[
          'gender',
          { rules: [{ required: true, message: 'Please select your gender!' }] },
        ]" placeholder="Select a option and change input text above" @change="handleSelectChange">
                  <a-select-option value="male">
                    male
                  </a-select-option>
                  <a-select-option value="female">
                    female
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :before-upload="beforeUpload"
                @change="handleChange">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
        </a-form>
        <div v-show="type=='like'">
          <lickCard url="/url" />
        </div>
        <div v-show="type=='history'">
          <lickCard url="/url" />
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import lickCard from '@/components/card/lickCard.vue'
export default {
  layout: 'sign',
  components: {
    lickCard,
  },
  data() {
    return {
      placement: 'top',
      visible: false,
      type: 'setting', //setting|history|like|follow
      height: 500,
      width: 400,

      loading: false,
      imageUrl: '',
    }
  },
  methods: {
    showSetting() {
      this.placement = 'top'
      this.visible = true
      this.type = 'setting' //setting|history|like|follow
    },
    showHistory() {
      this.placement = 'left'
      this.visible = true
      this.type = 'history' //setting|history|like|follow
    },
    showLike() {
      this.placement = 'left'
      this.visible = true
      this.type = 'like' //setting|history|like|follow
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
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
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