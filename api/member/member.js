import request from "@/utils/request";

const baseUrl = '/member/member'

export default {
  // 根据id修改用户信息
  updateById(userInfo){
    return request({
      url: `${baseUrl}/updateUser`,
      method: 'put',
      data: userInfo
    })
  }
}
