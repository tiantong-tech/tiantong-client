<template>
  <div>
    <DateField
      default="now"
      v-model="params.deadline"
    ></DateField>
    <a
      @click="handleSubmit"
      class="button is-info"
    >提交</a>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import DateField from './components/DateField'

export default {
  name: 'QuotationCreate',
  props: {
    schema: {}
  },
  components: {
    DateField
  },
  data: () => ({
    params: {
      deadline: ''
    }
  }),
  methods: {
    handleSubmit () {
      this.params.design_schema_id = this.schema.id

      axios.post('/quotations/create', this.params)
        .then(response => {
          console.log(response.data)
          this.$emit('refresh', {
            quotation_ids: response.data.quotation_ids
          })
          this.$notify({ text: '报价申请已提交' })
        })
    }   
  }
}
</script>
