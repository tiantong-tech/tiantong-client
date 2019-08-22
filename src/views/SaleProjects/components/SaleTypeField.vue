<template>
  <div class="field">
    <label class="label">
      项目类型
    </label>
    <div class="control">
      <input
        class="input"
        :value="text"
        style="width: 280px"
        readonly
      >
    </div>
  </div>
</template>

<script>
const valueTextMap = {
  'hoister': '提升机'
}

export default {
  name: 'SaleTypeField',
  props: {
    value: {}
  },
  computed: {
    text () {
      return valueTextMap[this.value]
    },
    types () {
      return [
        { text: '提升机', value: 'hoister' }
      ]
    }
  }
}
</script>
