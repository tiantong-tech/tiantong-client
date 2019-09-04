<template>
  <div>
    <SchemaStatusField v-model="params.is_completed">
    </SchemaStatusField>
    <div class="field" style="width: 280px">
      <label class="label">产品类型</label>
      <div class="control">
        <input type="text" class="input" value="提升机" readonly>
      </div>
    </div>
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
    <div class="is-flex">
      <a
        @click="handleSave"
        :disabled="!isChanged"
        class="button is-info"
      >
        更新信息
      </a>
      <span class="is-flex-auto"></span>
      <a
        class="button is-danger"
        @click="handleDelete"
      >
        删除依赖书
      </a>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import dataModifier from '@/mixins/data-editor.js'
import AutoTextarea from '@/components/Textarea'
import HoisterSchema from './components/HoisterSchema'
import SchemaStatusField from './components/SchemaStatusField'

export default {
  name: 'SchemaDescription',
  mixins: [
    new dataModifier({
      data: 'schema',
      paramsId: 'design_schema_id',
      url: '/design/schemas/update',
    })
  ],
  components: {
    AutoTextarea,
    HoisterSchema,
    SchemaStatusField,
  },
  props: {
    schema: {}
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
    handleDelete () {
      const params = { design_schema_id: this.schema.id }
      this.$confirm({
        title: '警告',
        content: '删除依赖书后将无法恢复',
        handler: () => axios.post('/design/schemas/delete', params)
          .then(() => {
            this.$emit('refresh')
            this.$notify({ text: '依赖书已删除' })
            this.$router.push(`/sale/projects/${this.schema.project_id}`)
          })
      })
    },
  }
}
</script>
