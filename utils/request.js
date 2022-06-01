import axios from "axios";
import cookie from "js-cookie";

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:88',
  timeout: 20000
})

// http拦截器
// 用户登录成功之后，后端返回token存在cookie里面，如果cookie里面有数据，那么就将它拿到请求头里面，如果没有就不存
service.interceptors.request.use(
  config => {
    // 判断cookie中是否有名称叫做travel_token的数据
    const travelToken = cookie.get('travel_token')
    if (travelToken == '' || travelToken == null || travelToken == undefined) {
      console.log('请求拦截器没有获取到token')
    } else {
      // 把获取到的cookie值放到header里面
      config.headers['token'] = cookie.get('travel_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
