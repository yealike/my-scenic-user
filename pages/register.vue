<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params" :rules="rules">
        <!--用户名-->
        <el-form-item class="input-prepend restyle" prop="nickname">
          <el-input type="text" auto-complete="false" placeholder="昵称" v-model="params.nickName"/>
          <i class="iconfont icon-yonghu"></i>
        </el-form-item>

        <!--邮箱-->
        <el-form-item class="input-prepend restyle no-radius" prop="email">
          <el-input type="text" auto-complete="false" placeholder="邮箱" v-model="params.email"/>
          <i class="iconfont icon-phone"></i>
        </el-form-item>

        <!--验证码-->
        <el-form-item class="input-prepend restyle no-radius" prop="code">
          <div style="width: 100%;display: block;float: left;position: relative;">
            <el-input type="text" auto-complete="false" placeholder="验证码" v-model="params.code"/>
            <i class="iconfont icon-phone"></i>
          </div>
          <div class="btn" style="position: absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button"
               @click="getCodeFun()"
               style="border: none;">{{ codeTest }}</a>
          </div>

        </el-form-item>

        <!--密码-->
        <el-form-item class="input-prepend" prop="password">
          <el-input type="text" auto-complete="false" placeholder="设置密码" v-model="params.password"/>
          <i class="iconfont icon-password"></i>
        </el-form-item>

        <!--注册-->
        <el-form-item class="btn">
          <el-button type="submit" class="sign-up-button" @click="submitRegister">注册</el-button>
        </el-form-item>

        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>


      <!-- 更多注册方式 -->
      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href=""><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/iconfont/iconfont.css'


export default {
  layout: 'sign',
  data() {
    return {
      params: {
        nickName: '',
        email: '',
        code: '',
        password: '',
      },
      rules: {
        nickname: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      },
      sending: true,// 是否发送验证码
      second: 60,// 倒计时
      codeTest: '获取验证码'
    }
  },
  methods: {

  }
}
</script>
