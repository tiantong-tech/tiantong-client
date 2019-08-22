<template>
  <div class="field">
    <label class="label">项目进度</label>
    <div class="control">
      <SelectableButtons
        :value="value"
        @input="$emit('input', $event)"
        :options="types"
      >
      </SelectableButtons>
    </div>
  </div>
</template>

<script>
import SelectableButtons from '@/components/SelectableButtons'

export default {
  name: 'ProgressField',
  components: {
    SelectableButtons
  },
  props: {
    value: {}
  },
  data: () => ({
    types: ['交流中', '投标中', '已投标', '已落标', '已中标']
  })
}
</script>
