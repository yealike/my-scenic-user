import request from '@/utils/request'

const baseUrl = '/member/member'

export default {
  //发送验证码
  getCode(email) {
    return request.post(`/member/member/sendCode?email=${email}`)
  },
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
  getUserInfoById(id, oid) {
    return request.get(`/member/member/${id}?otherId=${oid}`)
  },
  //收藏
  collect(data) {
    return request.post(`/member/collection/add`, data)
  },
  //取消收藏
  removeCollect() {},
  //根据用户id查询收藏列表
  fetchCollectList(userId, current, limit) {
    return request.get(`/member/collection/query/${userId}/${current}/${limit}`)
  },
  // 获取关注状态
  fetchFollow(UID, MID) {
    return
  },
  //切换关注
  toggleFollow(UID, MID) {
    return request.get(`/member/focus/pick/${MID}/${UID}`)
  },
  //添加浏览历史
  addHistory(data) {
    console.log(data)
    return request.post(`/member/history/save`, data)
  },
  register(user) {
    return request.post('/member/member/register', user)
  },
}
