export default {
  state: () => ({
    Id: '',
    hotleName: '',
    possition: {
      latitude: '',
      longitude: '',
    },
    address: '',
    price: '',
    score: '',
    brand: '',
    city: '',
    start: '',
    business: '',
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
