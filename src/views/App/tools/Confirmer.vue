<template>
  <div :class="['modal', isShow && 'is-active']">
    <div class="modal-background" @click="handleClose"/>
    <div class="modal-card" style="width: 320px">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{title}}
        </p>
      </header>
      <section class="modal-card-body">
        {{content}}
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          :class="isLoading && 'is-loading'"
          @click="handleConfirm"
        >确认</button>
        <button
          class="button"
          @click="handleClose"
        >取消</button>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'ModalCard',
  model: {
    prop: 'show',
    event: 'close'
  },
  data () {
    return {
      isShow: false,
      isLoading: false,

      title: '',
      content: '',
      handler: false,
      beforeClose: false
    }
  },
  methods: {
    // handleEscape () {
    //   console.log(1000)
    //   this.handleClose() 
    // },
    async handleClose () {
      try {
        this.beforeClose && await this.beforeClose()
      } finally {
        this.isShow = false
      }
    },
    async handleConfirm () {
      if (this.handler) {
        try {
          this.isLoading = true
          const result = await this.handler()
          if (result !== false) {
            this.isShow = false
          }
        } finally {
          this.isLoading = false
        }
      } else {
        this.$emit('confirm')
      }
    },
    close () {
      this.handleClose()
    },
    $open ({ title, content, handler, beforeClose }) {
      this.title = title
      this.content = content
      this.handler = handler
      this.beforeClose = beforeClose
      this.isShow = true
    }
  },
  created () {
    Vue.prototype.$confirm = this.$open
  }
}
</script>
