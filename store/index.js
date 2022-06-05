import scenic from './scenic'
import user from './user'
import hotel from './hotel'
import Vuex from 'vuex'
const store = new Vuex.Store({
  modules: {
    user,
    scenic,
    hotel,
  },
})
