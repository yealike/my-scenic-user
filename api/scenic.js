import request from '@/utils/request'

export default {
  // 获取景点列表--带分页
  getScenicList(current, limit) {
    return request({
      url: `/scenic/scenic/page/${current}/${limit}`,
      method: 'post',
      data: {},
    })
  },
  // 根据id获取景点信息
  getScenicInfoById(id) {
    return request({
      url: `/scenic/scenic/${id}`,
      method: 'get',
    })
  },
  // 根据景点id查询价格列表
  getPriceList(id) {
    return request({
      url: `/scenic/price/${id}`,
      method: 'get',
    })
  },
  // 根据id获取景点信息
  getInfoByScenicId(id) {
    return request({
      url: `/scenic/information/${id}`,
      method: 'get',
    })
  },
  // 根据城市景点id查询景点描述
  getDescription(id) {
    return request({
      url: `/scenic/description/${id}`,
      method: 'get',
    })
  },
  //获取一级评论
  getOneLevelCommentList(current, limit) {
    return request({
      url: `/scenic/comment/list/${current}/${limit}`,
      method: 'get',
    })
  },
  //获取子评论
  fetchChildComment(id) {
    return request.get(`/member/comment/front/{commentId}/1/10`)
  },
  //获取所以评论带子评论
  fetchAllComment(current, limit, tag, tagId) {
    return request.post(`/member/comment/front/query/${current}/${limit}`, {
      tag,
      tagId,
    })
  },
  // 根据城市id查询城市
  getCityNameById(id) {
    return request({
      url: `/scenic/city/${id}`,
      method: 'get',
    })
  },
  //获取城市列表
  getCityList() {
    return request.get('/scenic/city/')
  },
  //城市的景点
  fetchScenicByCity(current, limit, cityname) {
    return request.get(
      `/scenic/scenic/scenic/bycity/${current}/${limit}?cityname=${cityname}`
    )
  },
  addComment(data) {
    const old = {
      commentLevel: 0,
      content: '',
      gmtCreate: '',
      id: '',
      isDelete: 0,
      isTop: 0,
      parentCommentId: '',
      parentCommentUserId: '',
      praiseNum: 0,
      replayCommentId: '',
      replayCommentUserId: '',
      scenicId: '',
      scenicName: '',
      userId: '',
      userName: '',
    }
    return request.post('/scenic/comment/save', data)
  },
  //查询旅游信息
  fetchInformation(id) {
    return request.get(`/scenic/information/${id}`)
  },
}
