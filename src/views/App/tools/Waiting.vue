<template>
  <div v-show="show" class="modal is-active" style="z-index: 99999999">
    <div class="modal-background"></div>
    <div class="waiting has-text-white"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { sleep } from '@/utils/async'

export default {
  name: 'Waiting',
  data () {
    return {
      show: false
    }
  },
  methods: {
    async open (handler, delay = 0) {
      this.show = true
      try {
        await sleep(delay)
        await handler()
      } finally {
        this.show = false
      }
    }
  },
  created () {
    Vue.prototype.$wait = this.open
  }
}
</script>
