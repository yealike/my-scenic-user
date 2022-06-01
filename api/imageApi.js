import request from "@/utils/request";

const baseUrl = '/scenic/scenic'

export default {
  // 上传图片
  addImage(image) {
    return request({
      url: `${baseUrl}/oss`,
      method: 'post',
      data: image
    })
  }
}
