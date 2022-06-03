export default {
  state: () => ({
    logined: false,
    userName: '',
    userAvatar: '',
    userEmail: '',
  }),
  mutations: {
    login(state) {
      state.logined = true
    },
    logout(state) {
      state.logined = false
    },
  },
  getters: {
    getLogined(state) {
      return state.logined
    },
  },
}
