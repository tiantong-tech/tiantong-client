<template>
  <div class="field" v-style:width="width">
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
import DatePicker from '@/components/DatePicker/index.vue'

export default {
  components: {
    DatePicker
  },
  props: {
    value: {},
    text: {},
    width: {
      type: String,
      default: '280px'
    }
  }
}
</script>
