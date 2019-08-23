<template>
  <component
    :is="tag"
    class="button"
    v-bind="$attrs"
    v-class:is-loading="isLoading"
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
