<template>
  <input
    :class="[
      'input',
      'is-' + color
    ]"
    type="text"
    :placeholder="placeholder"
    :value="value"
  />
</template>

<script>
import mixin from './mixin'

export default {
  mixins: [mixin]
}
</script>
