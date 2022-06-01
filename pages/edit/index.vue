<template>
  <div class="container-md container-lg" style="border: #4e4e4e 1px solid;border-radius: 5px">
    <div class="create container-md container-lg">
      <h1>编写新的作品</h1>

      <div class="create-title">
        <el-input id="title" v-model="articalInfo.title" placeholder="输入标题"></el-input>
      </div>

      <t-editor v-model="articalInfo.content" :height="800"></t-editor>
      <el-button type="success" id="submitBtn" style="margin: 20px" @click="submitData">提交</el-button>

    </div>
  </div>
</template>

<script>
import TEditor from "@/components/TEditor";
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: "index",
  components: {TEditor},
  data() {
    return {
      articalInfo: {
        id: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submitData() {
      console.log(this.articalInfo)
    }
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
  width: 20%;
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
