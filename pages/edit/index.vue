<template>
  <div
    class="container-md container-lg"
    style="border: #4e4e4e 1px solid; border-radius: 5px"
  >
    <div class="create container-md container-lg">
      <h1 class="edit-title">编写新的作品</h1>
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="标题">
          <a-input v-model="articalInfo.title" />
        </a-form-item>
        <a-form-item label="封面">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="`${BASE_URL}/scenic/upload/image`"
            @change="handleChange"
          >
            <img
              v-if="this.articalInfo.cover"
              :src="this.articalInfo.cover"
              alt="cover"
            />
            <div v-else>
              <a-icon :type="'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <t-editor v-model="articalInfo.content" :height="800"></t-editor>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> 发布Log </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import TEditor from '@/components/TEditor'
import articleApi from '@/api/article.js'
import env from '@/env'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'index',
  components: { TEditor },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      articalInfo: {
        id: new Date().getTime(),
        userId: '',
        title: '',
        cover: '',
        content: '',
        username: '',
      },
      imageUrl: '',
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.articalInfo.cover = info.file.response.data.url
      }
    },
    async handleSubmit(e) {
      this.articalInfo.userId = JSON.parse(
        window.localStorage.getItem('user')
      ).id
      this.articalInfo.username = JSON.parse(
        window.localStorage.getItem('user')
      ).username
      e.preventDefault()
      console.log(this.articalInfo)
      if (this.articalInfo.userId == '') {
        this.$message.error('请先登录')
      } else {
        await articleApi.addOneArticle(this.articalInfo)
        //提示
        // 发送成功之后，跳转到个人中心
        this.$router.push('/person/self')
      }
    },
  },
  computed: {
    BASE_URL() {
      return env.dev.BASE_URL
    },
  },
}
</script>

<style scoped>
.create {
  margin: 20px;
}

.create > h1 {
  text-align: center;
  margin: 20px;
}

.create-title {
  width: 35%;
  margin: 30px auto;
}

/*.footer {*/
/*  margin: 15px;*/
/*  border: #4e4e4e 1px solid;*/
/*  width: 99%;*/
/*  height: 80px;*/
/*  padding: 10px;*/
/*  position: sticky;*/
/*  bottom: 5px;*/
/*}*/

/*#submitBtn {*/
/*  float: right;*/
/*  margin-right: 20px;*/
/*  width: 100px;*/
/*  height: 60px;*/
/*  font-size: 30px;*/
/*}*/
.edit-title {
  font-weight: 800;
  text-align: center;
}
</style>
