<template>
  <div class="has-text-centered has-text-danger">
    <h1 class="is-size-1">
      This page should never appear!!!
    </h1>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import Token from '@/providers/token'


const groupPath = [
  ['root', '/users'],
  ['admin', '/users'],
  ['sale', '/sale/tracks']
]

export default {
  name: 'Home',
  created () {
    // 获取 api 信息
    axios.get('/api')
      .then(response => {
        console.log(response.data.message)
      })
  },
  beforeRouteEnter (to, from, next) {
    const handleAuthed = () => {
      for (let key in groupPath) {
        const [ group, path ] = groupPath[key]
        if (Token.state.groups.includes(group)) {
          next(path)

          return
        }
      }
    }
    const handleUnauthed = () => {
      next('/login')
    }

    Token.state.isAuthed ? handleAuthed() : handleUnauthed()
  }
}
</script>
