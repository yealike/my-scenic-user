import request from "@/utils/request";

const baseUrl = '/article/article'

export default {
  // 上传一篇文章
  addOneArticle(article){
    return request({
      url: `${baseUrl}/add`,
      method: 'post',
      data: article
    })
  },
  // 根据用户id查询作品，分页的
  getArticleByUserIdWithPage(userId,current,limit){
    return request({
      url: `${baseUrl}/usr/${userId}/${current}/${limit}`,
      method: 'get'
    })
  }
}
