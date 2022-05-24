import request from "@/utils/request";

const baseUrl = '/member/member'

export default {
  // 登录
  login(userInfo) {
    return request({
      url: `${baseUrl}/login`,
      method: 'post',
      data: userInfo
    })
  },
  // 根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: `${baseUrl}/getInfo`,
      method: 'get'
    })
  }
}
