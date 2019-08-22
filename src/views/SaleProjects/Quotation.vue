<template>
  <div>
    <div class="field" style="width: 280px">
      <label class="label">报价类型</label>
      <div class="control">
        <input
          readonly
          type="text" class="input"
          :value="getQuotationTypeText(quotation.type)"
        >
      </div>
    </div>
    <DateField
      v-model="params.deadline"
    ></DateField>
    <DateField
      text="交付日期"
      v-model="params.offered_at"
    ></DateField>
    <div class="field">
      <label class="label">报价结果</label>
      <div class="control">
        <AutoTextarea v-model="params.content"></AutoTextarea>
      </div>
    </div>
    <a
      @click="handleSave"
      :disabled="!isChanged"
      class="button is-info"
    >
      更新信息
    </a>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import dataModifier from '@/mixins/dataModifier'
import AutoTextarea from '@/components/Textarea'
import DateField from './components/DateField.vue'
import { getQuotationTypeText } from './components/quotation.js'

export default {
  name: 'Quotation',
  mixins: [
    dataModifier('params', 'quotation')
  ],
  components: {
    DateField,
    AutoTextarea
  },
  props: {
    quotation: Object
  },
  data: () => ({
    params: {
      deadline: '',
      content: '',
      offered_at: null
    }
  }),
  methods: {
    getQuotationTypeText,
    handleSave () {
      const params = this.changedParams
      params.quotation_id = this.quotation.id
      axios.post('/quotations/update', params)
        .then(() => {
          for (let key in params) {
            this.quotation[key] = params[key]
          }
          window.scrollTo(0, 0)
          this.$notify({ text: '依赖书信息已更新' })
        })
    }
  }
}
</script>
