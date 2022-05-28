import request from "@/utils/request";

const baseUrl = '/scenic/information'

export default {
  getInfoByScenicId(id) {
    return request({
      url: `${baseUrl}/${id}`,
      method: 'get'
    })
  }
}
