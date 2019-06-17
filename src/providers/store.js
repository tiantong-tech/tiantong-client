import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    error: {
      network: false
    }
  },
  mutations: {
    setUser (state, user = null) {
      state.user = user
    },
    setNetworkError (state, error = true) {
      state.error.network = error
    }
  },
  actions: {

  }
})

export default store
