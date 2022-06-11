export default {
  state: () => ({
    scenicList: [],
  }),
  mutations: {
    addScenicList(state, payload) {
      state.scenicList = payload
    },
  },
  actions: {},
  getters: {},
}
