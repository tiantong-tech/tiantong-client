<template>
  <div>
    <h1>This is Home Page</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    axios.get('/')
      .then(response => {
        console.log(response.data.message)
      })
  }
}
</script>
