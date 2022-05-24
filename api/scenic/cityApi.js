import request from "@/utils/request";

const baseUrl = '/scenic/city'

export default {
  // 根据城市id查询城市
  getCityNameById(id) {
    return request({
      url: `${baseUrl}/${id}`,
      method: 'get'
    })
  }
}
