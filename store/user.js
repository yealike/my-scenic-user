import Cookies from 'js-cookie'
export default {
  state: () => ({
    logined: false,
    id: '',
    userName: '',
    userAvatar: '',
    userEmail: '',
  }),
  mutations: {
    login(state) {
      Cookies.set('logined', true)
      state.logined = true
    },
    logout(state) {
      state.logined = false
    },
    setUserInfo(state, user) {
      state.id = user.id
      state.userName = user.userName
      state.userAvatar = user.userAvatar
      state.userEmail = user.userEmail
    },
  },
  getters: {
    getLogined(state) {
      return Cookies.get('logined')
    },
    getUserInfo(state) {
      const { id, userName, userAvatar, userEmail } = state
      console.log(id)
      return {
        id,
        userName,
        userAvatar,
        userEmail,
      }
    },
  },
}
