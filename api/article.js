import request from '@/utils/request'

const baseUrl = '/article/article'

export default {
  // 上传一篇文章
  addOneArticle(article) {
    return request({
      url: `${baseUrl}/add`,
      method: 'post',
      data: article,
    })
  },
  // 根据用户id查询作品，分页的
  getArticleByUserIdWithPage(userId, current, limit) {
    return request({
      url: `${baseUrl}/usr/${userId}/${current}/${limit}`,
      method: 'get',
    })
  },
  //按页获取文章
  getArticle(current, limit) {
    return request.get(`/article/article/page/${current}/${limit}`)
  },
  //获取文章详情
  getDetail(id) {
    return request.get(`/article/article/${id}`)
  },
  //点赞作品
  like(userId, articleId) {
    return request.get(`/article/praise/click/${userId}/${articleId}`)
  },
  //查询赞
  fetchLike(userId, articleId) {
    return request.get(`/article/praise/praise/${userId}/${articleId}`)
  },
  //最多的作品
  getTopArticle() {
    return request.get('/article/statistics/praise')
  },
}
