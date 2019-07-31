<template>
  <td>
    <span v-if="data.province && data.city">
      {{data.province + ' ' + data.city}}
    </span>
    <span v-else>未知</span>
  </td>
</template>

<script>
export default {
  name: 'LocationWrapper',
  props: {
    data: {}
  }
}
</script>
