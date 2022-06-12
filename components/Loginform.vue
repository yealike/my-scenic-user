<template>
  <a-form layout="horizontal" :form="form" @submit="handleSubmit">
    <h3>登录</h3>
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        size="large"
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your email!' }] },
        ]"
        placeholder="Email"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
    >
      <a-input
        size="large"
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import '~/assets/iconfont/iconfont.css'
import loginApi from '@/api/user.js'
import cookie from 'js-cookie'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  layout: 'sign',
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      // 用户信息
      loginInfo: {
        id: '',
        username: '',
        avatar: '',
        email: '',
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    async handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.submitLogin(values)
        }
      })
    },
    async setInfo() {
      const { data: res } = await loginApi.getLoginUserInfo()
      const user = res.member
      console.log('89', user)
      window.localStorage.setItem('user', JSON.stringify(user))
      cookie.set('user', JSON.stringify(user))
    },
    submitLogin(user) {
      loginApi.login(user).then((resp) => {
        this.setInfo()
        // 登录成功
        if (resp.success) {
          // 把token存到cookie里面
          // 参数1：cookie名称   参数2：cookie值   参数3：作用范围
          cookie.set('travel_token', resp.data.token, {
            domain: 'localhost',
          })
          cookie.set('logined', 'true')
          // this.$store.commit('login')
          window.localStorage.setItem('token', resp.data.token)
          // 跳转页面
          this.$router.push('/home')
        } else {
          this.$message.error(resp.data.msg)
        }
      })
    },
  },
}
</script>

<style scoped>
@import url('@/assets/style/index.css');
h5,
h3 {
  text-align: center;
}
</style>
