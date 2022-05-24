import request from "@/utils/request";

const baseUrl = '/scenic/scenic'

export default {
  // 获取景点列表--带分页
  getScenicList(current, limit) {
    return request({
      url: `${baseUrl}/page/${current}/${limit}`,
      method: 'post',
      data: {}
    })
  },
  // 根据id获取景点信息
  getScenicInfoById(id) {
    return request({
      url: `${baseUrl}/${id}`,
      method: 'get'
    })
  }
}
