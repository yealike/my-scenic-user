import request from '@/utils/request'

export default {
  // 上传图片
  addImage(image) {
    return request({
      url: '/scenic/upload/image',
      method: 'post',
      data: image,
    })
  },
}
