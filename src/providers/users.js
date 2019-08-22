import Vue from 'vue'
import axios from './axios'

export const state = Vue.observable({
  list: [],
  data: {},
  isLoaded: false
})

export function items () {
  return state.list.map(id => state.data[id])
}

function getUsers () {
  return axios.post('/users/get')
    .then(response => {
      const list = []
      const data = {}

      response.data.forEach(user => {
        list.push(user.id)
        data[user.id] = user
      })

      state.data = data
      state.list = list
      state.isLoaded = true
    })
}

export async function get () {
  if (!state.isLoaded) {
    await getUsers()
  }

  return state.users
}

export function reload() {
  return getUsers()
}

export default {
  get,
  items,
  state,
  reload
}
