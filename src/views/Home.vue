<template>
  <div class="has-text-centered has-text-danger">
    <h1 class="is-size-1">
      This page should never appear!!!
    </h1>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import store from '@/providers/store'

const groupList = ['root', 'admin', 'sale']

const groupRouteMap = {
  root: '/users',
  admin: '/users',
  sale: '/sale/tracks'
}

function getApiStatus () {
  axios.get('/api')
    .then(response => {
      console.log(response.data.message)
    })
}

export default {
  name: 'Home',
  beforeRouteEnter (to, from, next) {
    getApiStatus()
    groupList.forEach(group => {
      store.state.groups.includes(group) &&
      next(groupRouteMap[group])
    })
  }
}
</script>
