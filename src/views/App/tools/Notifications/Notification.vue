<template>
  <div :class="'box is-' + type">
    <p
      class="is-flex"
      style="align-items: center; justify-content: center; min-height: 2rem"
    >
      <span
        class="is-flex-auto is-flex"
        style="align-items: center; justify-content: center"
      >
        <template v-if="type">
          <span :class="'icon has-text-' + type">
            <i :class="'iconfont icon-' + type" style="font-size: 1.75rem"></i>
          </span>
          <span style="width: 1rem"></span>
        </template>
        <span>{{text}}</span>
      </span>
      <button @click="close" class="delete is-medium"></button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppNotificationItem',
  props: {
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 3333
    },
    text: {
      type: String,
      default: '个人信息已修改'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    if (this.duration) {
      setTimeout(() => this.close(), this.duration)
    }
  }
}
</script>
