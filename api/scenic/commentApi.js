import request from "@/utils/request";

const baseUrl = '/scenic/comment'

export default {
  getOneLevelCommentList(current, limit) {
    return request({
      url: `${baseUrl}/list/${current}/${limit}`,
      method: 'get'
    })
  }
}
