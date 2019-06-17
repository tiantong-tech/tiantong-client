import Store from './store'
import Router from './router'
import Storage from 'store'
import axios from './axios';

export default {
  get () {
    return Storage.get('token')
  },
  set (token) {
    console.log(Storage.set)
    Storage.set('token', token)
  },
  async handle (token = '') {
    if (token) {
      this.set(token)
    } else {
      token = this.get()
    }

    if (!token) {
      Store.commit('setAuth', 'guest')
    } else {
      const handleThen = ({ data }) => {
        const { user, token } = data

        token && this.set(token)
        Store.commit('setUser', user)
      }

      return getUserProfile()
        .then(handleThen)
    }
  },
  handleForbidden () {
    Store.commit('setUser', null)
    Router.push('/login')
  }
}

function getUserProfile () {
  return axios.post('user/profile')
}
