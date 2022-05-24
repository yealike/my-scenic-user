import request from "@/utils/request";

const baseUrl = '/member/member'

export default {
  // 根据邮箱发送验证码
  getCodeByEmail(email) {
    return request({
      url: `${baseUrl}/sendCode`,
      method: 'post',
      data: email
    })
  },
  // 用户注册
  register(userInfo) {
    return request({
      url: `${baseUrl}/register`,
      method: 'post',
      data: userInfo
    })
  }
}
