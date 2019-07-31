<template>
  <component
    :is="tag"
    class="button"
    :class="isLoading && 'is-loading'"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
