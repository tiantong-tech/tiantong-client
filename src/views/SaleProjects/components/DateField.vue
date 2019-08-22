<template>
  <div class="field" style="width: 280px">
    <label class="label">
      {{text || '截止日期'}}
    </label>
    <div class="control">
      <DatePicker
        :value="value"
        v-bind="$attrs"
        @change="$emit('input', $event)"
      ></DatePicker>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'

export default {
  components: {
    DatePicker
  },
  props: {
    value: {},
    text: {}
  }
}
</script>
