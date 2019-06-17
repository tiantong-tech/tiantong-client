import axios from 'axios'
import store from './store'
import Token from './token'

axios.defaults.baseURL = process.env.VUE_APP_API_URL_BASE

function beforeRequest (config) {
  const token = Token.get();
  if (token) {
    config.headers.Authorization = token
  }

  return config
}

function beforeResponse (response) {
  if (store.state.error.network) {
    store.commit('setNetworkError', false)
  }

  return response
}

function beforeError (error) {
  if (!error.response) {
    store.commit('setNetworkError')
  } else {
    if (store.state.error.network) {
      store.commit('setNetworkError', false)
    }  
  }

  throw error
}

axios.interceptors.request.use(
  beforeRequest
)

axios.interceptors.response.use(
  beforeResponse,
  beforeError
)

export default axios
