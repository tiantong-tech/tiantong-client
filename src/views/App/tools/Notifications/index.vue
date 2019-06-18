<template>
  <div class="app-notifications">
    <Notification
      v-for="item in items" :key="item.id"
      @close="remove(item.id)"
      v-bind="item"
    ></Notification>
  </div>
</template>

<script>
import Vue from 'vue'
import Notification from './Notification'

export default {
  name: 'AppNotifications',
  components: {
    Notification
  },
  data () {
    return {
      count: 1,
      items: []
    }
  },
  methods: {
    async add ({ type, text, handler, duration = 3000 }) {
      if (handler) {
        await handler()
      }
      this.items.push({ text, type, duration, id: this.count++ })
    },
    remove (id) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  },
  created () {
    Vue.prototype.$notify = this.add
  }
}
</script>
