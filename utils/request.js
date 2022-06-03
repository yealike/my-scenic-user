import axios from 'axios'
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:88',
  timeout: 20000,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const travelToken = cookie.get('travel_token')
    if (travelToken) {
      config.headers['token'] = travelToken
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// // http拦截器
// // 用户登录成功之后，后端返回token存在cookie里面，如果cookie里面有数据，那么就将它拿到请求头里面，如果没有就不存
// service.interceptors.request.use(
//   (config) => {
//     // 判断cookie中是否有名称叫做travel_token的数据
//     const travelToken = cookie.get('travel_token')
//     if (travelToken == '' || travelToken == null || travelToken == undefined) {
//       console.log('请求拦截器没有获取到token')
//     } else {
//       // 把获取到的cookie值放到header里面
//       config.headers['token'] = cookie.get('travel_token')
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default service
