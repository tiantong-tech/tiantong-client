<template>
  <td>{{text}}</td>
</template>

<script>
const valueTextMap = {
  'root': '拥有者',
  'admin': '管理员',
  'sale': '销售'
}

export default {
  props: {
    value: Array
  },
  computed: {
    text: vm => vm.value.map(val => valueTextMap[val]).join('|')
  }
}
</script>
