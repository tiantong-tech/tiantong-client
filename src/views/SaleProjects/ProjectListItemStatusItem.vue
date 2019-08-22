<template>
  <span
    class="tag"
    v-if="valueColorMap[value]"
    v-class="'is-' + valueColorMap[value]"
    style="margin-right: 0.25rem"
  >
    状态 {{value}}
  </span>
</template>

<script>
const valueColorMap = {
  1: 'info',
  // 2: 'link',
  3: 'success',
  4: 'warning',
  // 5: 'danger'
}

export default {
  name: 'StatusItem',
  props: {
    value: Number
  },
  data: () => ({
    valueColorMap
  })
}
</script>
