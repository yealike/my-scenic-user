<template>
  <div class="container-md container-lg" style="border: #4e4e4e 1px solid;border-radius: 5px">
    <div class="create container-md container-lg">
      <h1>编写新的作品</h1>

      <div class="create-title">

        <el-form :model="articalInfo" status-icon ref="ruleForm" label-width="100px">
          <el-form-item label="文章标题">
            <el-input type="text" v-model="articalInfo.title" placeholder="输入文章标题" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="文章封面">
            <el-image
              style="border-radius: 5px;width: 150px;height: 100px;"
              fit="fit"
              :src="articalInfo.cover!=''?articalInfo.cover:'http://localhost:3000/R-C.jpg'"
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

        </el-form>
      </div>

      <t-editor v-model="articalInfo.content" :height="800"></t-editor>
      <el-button type="success" id="submitBtn" style="margin: 20px" @click="submitData">提交</el-button>

    </div>
  </div>
</template>

<script>
import TEditor from "@/components/TEditor";
import 'bootstrap/dist/css/bootstrap.css'
import articleApi from "@/api/article/article";

export default {
  name: "index",
  components: {TEditor},
  data() {
    return {
      articalInfo: {
        id: '',
        userId:'',
        title: '',
        cover:'',
        content: ''
      },
      imageUrl: 'http://localhost:88/scenic/scenic/oss'
    }
  },
  methods: {
    submitData() {
      const userInfo = localStorage.getItem('userInfo')
      const userJson = JSON.parse(userInfo)
      // 如果查不到用户信息，就不发送网络请求
      this.articalInfo.userId = userJson.id
      // console.log(userJson)
      if (this.articalInfo.userId==''){
        this.$message.error('请先登录')
      }else {
        articleApi.addOneArticle(this.articalInfo)
          .then(resp=>{
            this.$message({
              type:'success',
              message:'保存成功'
            })
            // 发送成功之后，跳转到个人中心
            window.location.href = '/member'
          })
          .catch(err=>{
            this.$message.error('保存失败！')
          })
      }
    },
    // 图片上传成功之后的回调
    uploadImage(resp, file) {
      this.articalInfo.cover = resp.data.data.url
      console.log('file==>', file)
    },
  }
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

#title {
  /*width: 19%;*/

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
</style>
