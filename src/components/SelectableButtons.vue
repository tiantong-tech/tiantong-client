<template>
  <section class="field has-addons">
    <p
      v-for="option in options" :key="option"
      class="control"
    >
      <a
        class="button"
        @click="$emit('input', option)"
        :class="value === option && 'is-focused'"
      >
        <span>{{option}}</span>
      </a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'SelectableButtons',
  props: {
    value: String,
    options: Array
  }
}
</script>
