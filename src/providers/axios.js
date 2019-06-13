import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL_BASE

function handleRequest (config) {

  return config
}

function handleResponse (response) {

  return response
}

function handleError (error) {

  throw error
}

axios.interceptors.request.use(
  handleRequest
)

axios.interceptors.response.use(
  handleResponse,
  handleError
)

export default axios
