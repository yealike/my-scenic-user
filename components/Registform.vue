<template>
  <a-form layout="horizontal" :form="form" @submit="handleSubmit">
    <h3>注册</h3>
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        size="large"
        v-decorator="[
          'username',
          {
            rules: [{ required: true, message: 'Please input your username!' }],
          },
        ]"
        placeholder="Username"
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
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
        ref="email"
        size="large"
        v-decorator="[
          'email',
          { rules: [{ required: true, message: 'Please input your Email!' }] },
        ]"
        placeholder="Email"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input-group>
        <a-col :span="10">
          <a-input
            size="large"
            v-decorator="[
              'code',
              {
                rules: [{ required: true, message: 'Please input your Code!' }],
              },
            ]"
            placeholder="code"
          >
            <a-icon
              slot="prefix"
              type="safety-certificate"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-col>
        <a-col :span="6">
          <a-button class="width80" @click="getCodeFun">{{
            timemessage
          }}</a-button>
        </a-col>
      </a-input-group>
    </a-form-item>
    <a-form-item>
      <a-button
        size="large"
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import '~/assets/iconfont/iconfont.css'
import registerApi from '@/api/user'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  data() {
    return {
      timer: '',
      codeFlag: true,
      second: 60, // 倒计时,
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    }
  },
  mounted() {
    this.$nextTick(() => {
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
    handleSubmit(e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          console.log(values)
          this.submitRegister(values)
          console.log('regist', values)
        }
      })
    },
    async submitRegister(user) {
      console.log('user', user)
      const { data: res } = await registerApi.register(user)
      console.log('rreess', res)
      if (res.isOK) {
        this.$notification.success({
          message: '注册成功',
        })
        this.$router.push('/signpage')
      } else {
        this.$notification.error({
          message: '注册失败',
        })
      }
    },
    getCodeFun() {
      if (this.second > 0 && this.second !== 60) {
        return
      }
      const email = this.$refs.email.value
      console.log(email)
      registerApi.getCode(email)
      // registerApi
      //   .getCodeByEmail(email)
      //   .then((resp) => {
      //     if (resp.data.success) {
      //     }
      //   })
      //   .catch((err) => {
      //     this.$message({
      //       type: 'error',
      //       message: '服务器内部错误',
      //     })
      //   })
      this.disable()
    },
    disable() {
      if (this.timemessage == '获取验证码') {
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 0) {
            this.second = 60
            clearInterval(this.timer)
          }
        }, 1000)
      }
    },
  },
  computed: {
    timemessage() {
      return this.second < 0 || this.second == 60 ? '获取验证码' : this.second
    },
  },
  beforeDestroy() {
    this.timer ? clearInterval(this.timer) : null
  },
}
</script>

<style scoped>
h3 {
  text-align: center;
}
.width80 {
  width: 100px;
  height: 40px;
}
</style>
