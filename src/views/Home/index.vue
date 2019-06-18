<template>
  <div>
    <h1>This is Home Page</h1>
    <h1>groups: {{groups}}</h1>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import store from '@/providers/store'

export default {
  name: 'Home',
  computed: {
    groups: () => store.state.groups
  },
  created () {
    axios.get('/api')
      .then(response => {
        console.log(response.data.message)
      })
  }
}
</script>
