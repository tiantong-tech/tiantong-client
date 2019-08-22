<template>
  <div class="field" style="width: 280px">
    <label class="label">产品类型</label>
    <div class="control">
      <input
        type="text" class="input"
        :value="text"
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
  name: 'SchemaTypeField',
  props: {
    value: {}
  },
  computed: {
    text () {
      return valueTextMap[this.value]
    }
  }
}
</script>
