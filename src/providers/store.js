import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAuthed: false,
    isInitialized: false,
    groups: [],
    error: {
      network: false
    }
  },
  mutations: {
    setGroups (state, groups = []) {
      state.groups = groups
    },
    setIsAuthed (state, value) {
      state.isAuthed = value
    },
    setInitialized (state, value = true) {
      state.isInitialized = value
    },
    setNetworkError (state, error = true) {
      state.error.network = error
    }
  }
})

export default store
