import request from "@/utils/request";

const baseUrl = '/scenic/description'

export default {
  // 根据城市景点id查询景点描述
  getDescription(id) {
    return request({
      url: `${baseUrl}/${id}`,
      method: 'get'
    })
  }
}
