import request from "@/utils/request";

const baseUrl = '/scenic/price'

export default {
  // 根据景点id查询价格列表
  getPriceList(id){
    return request({
      url: `${baseUrl}/${id}`,
      method: 'get'
    })
  }
}
