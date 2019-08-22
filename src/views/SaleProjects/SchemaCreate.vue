<template>
  <div>
    <SchemaStatusField v-model="params.is_completed"></SchemaStatusField>
    <SchemaTypeField v-model="params.type"></SchemaTypeField>
    <div class="field" style="width: 280px">
      <label class="label">依赖书名称</label>
      <div class="control">
        <input type="text" class="input" v-model="params.name">
      </div>
    </div>
    <div class="field" style="width: 280px">
      <label class="label">数量</label>
      <div class="control">
        <input type="text" class="input" v-model="params.quantity">
      </div>
    </div>
    <div class="field">
      <label class="label">备注</label>
      <div class="control">
        <AutoTextarea v-model="params.notes"></AutoTextarea>
      </div>
    </div>
    <HoisterSchema></HoisterSchema>
    <a
      class="button is-info"
      @click="handleSubmit"
    >
      创建依赖书
    </a>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import AutoTextarea from '@/components/Textarea'
import HoisterSchema from './components/HoisterSchema'
import SchemaTypeField from './components/SchemaTypeField'
import SchemaStatusField from './components/SchemaStatusField'

export default {
  name: 'DesignSchemaCreate',
  components: {
    AutoTextarea,
    HoisterSchema,
    SchemaTypeField,
    SchemaStatusField,
  },
  props: {
    project: {}
  },
  data: () => ({
    params: {
      type: 'hoister',
      name: '',
      notes: '',
      data: {},
      quantity: '',
      is_completed: false
    }
  }),
  methods: {
    handleSubmit () {
      this.params.project_id = this.project.id

      axios.post('/design/schemas/create', this.params)
        .then(response => {
          this.$notify({ text: '依赖书已创建' })
          this.$emit('refresh', {
            schema_id: response.data.schema_id
          })
        })
    }
  }
}
</script>
