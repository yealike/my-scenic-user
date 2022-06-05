import axios from 'axios'
export default {
  getCloud() {
    return axios.get(
      'https://v0.yiketianqi.com/api?unescape=1&version=v9&appid=88438678&appsecret=DSzi6tJF'
    )
  },
}
