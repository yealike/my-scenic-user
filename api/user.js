import request from '@/utils/request'

const baseUrl = '/member/member'

export default {
  // 获取历史
  getHistory(userId, current, limit) {
    return request({
      url: `/member/history/${userId}/${current}/${limit}`,
      method: 'get',
    })
  },
  // 根据id修改用户信息
  updateById(userInfo) {
    return request({
      url: `${baseUrl}/updateUser`,
      method: 'put',
      data: userInfo,
    })
  },
  // 登录
  login(userInfo) {
    return request.post('/member/member/login', userInfo)
  },
  // 根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: `${baseUrl}/getInfo`,
      method: 'get',
    })
  },
  getUserInfoById(id) {
    return request.get(`/member/member/${id}`)
  },
  //关注
  follow() {},
}
