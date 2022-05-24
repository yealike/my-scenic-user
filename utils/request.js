import axios from "axios";
import cookie from "js-cookie";

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:88',
  timeout: 20000
})

// http拦截器
service.interceptors.request.use(
  config => {
    // 判断cookie中是否有名称叫做travel_token的数据
    if (cookie.get('travel_token')) {
      // 吧获取到的cookie值放到header里面
      config.headers['token'] = cookie.get('travel_token')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
