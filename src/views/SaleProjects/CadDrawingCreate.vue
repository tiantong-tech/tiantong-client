<template>
  <div>
    <DateField
      default="now"
      v-model="params.deadline"
    ></DateField>
    <a class="button is-info" @click="handleSubmit">
      提交
    </a>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import DateField from './components/DateField.vue'

export default {
  name: 'CadDrawingCreate',
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
      axios.post('/cad/drawings/create', this.params)
        .then(response => {
          this.$notify({ text: '设计图申请已提交' })
          this.$emit('refresh', {
            drawing_id: response.data.cad_drawing_id
          })
        })
    }
  }
}
</script>
