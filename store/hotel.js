export default {
  state: () => ({
    Id: '',
    hotleName: '',
    possition: {},
  }),
  mutations: {
    setID(state, payload) {
      state.Id = payload
    },
    setHotleName(state, payload) {
      state.hotleName = payload
    },
    setPossition(state, payload) {
      state.possition = payload
    },
  },
  actions: {},
  getters: {},
}
