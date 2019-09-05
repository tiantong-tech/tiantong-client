<template>
  <div class="field">
    <label class="label">完善状态</label>
    <div class="control">
      <SelectableButtons
        :value="value"
        @input="$emit('input', $event)"
        :options="options"
      >
      </SelectableButtons>
    </div>
  </div>
</template>

<script>
import SelectableButtons from '@/components/SelectableButtons'

export default {
  name: 'SchemaStatusField',
  components: {
    SelectableButtons
  },
  props: {
    value: {}
  },
  data: () => ({
    options: [
      { value: false, text: '完善中' },
      { value: true, text: '已完善' }
    ]
  })
}
</script>
