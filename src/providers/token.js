import Vue from 'vue'
import Storage from 'store'
import axios from './axios'
import flatten from 'lodash/flatten'

const state = Vue.observable({
  token: '',
  groups: [],
  isAuthed: false,
  isLoaded: false,
})

export default {
  state,
  load () {
    const token = Storage.get('token')

    if (token) {
      this.state.token = token
    }
    this.state.isLoaded = true

    return Boolean(token)
  },
  set (token) {
    Storage.set('token', token)
    this.state.token = token
    this.state.isLoaded = true
  },
  remove () {
    this.state.token = ''
    this.state.isAuthed = false
    Storage.remove('token')
  },
  getProfile () {
    return axios.post('user/profile')
      .then(response => {
        const { user: { groups }, token } = response.data

        if (token) {
          this.set(token)
        }
        this.state.isAuthed = true
        this.state.groups = groups
      })
  },
  checkGroups (...groups) {
    groups = flatten(groups)

    return state.isAuthed && (
      !groups.length ||
      groups.some(group => state.groups.includes(group))
    )
  },
}
