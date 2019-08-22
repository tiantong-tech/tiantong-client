<template> 
  <div>
    <SaleTypeField v-model="params.sale_type"></SaleTypeField>

    <div class="field">
      <label class="label">公司</label>
      <div class="control">
        <input v-model="params.company" type="text" class="input" style="width: 280px">
      </div>
    </div>

    <MembersField v-model="params.member_ids"></MembersField>
    <ProgressField v-model="params.progress"></ProgressField>

    <div class="field">
      <label class="label">项目名称</label>
      <div class="control">
        <input type="text" class="input" v-model="params.name">
      </div>
    </div>

    <div class="field">
      <label class="label">客户信息</label>
      <div class="control">
        <AutoTextarea v-model="params.customer_information"></AutoTextarea>
      </div>
    </div>

    <div class="field">
      <label class="label">备注</label>
      <div class="control">
        <AutoTextarea v-model="params.notes"></AutoTextarea>
      </div>
    </div>

    <div class="columns" style="margin-bottom: 0">
      <div class="column">
        <div class="field">
          <label class="label">签约日期</label>
          <div class="control">
            <input type="text" class="input">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">交付日期</label>
          <div class="control">
            <input type="text" class="input">
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <a
          @click="handleSave"
          :disabled="!isChanged"
          class="button is-info"
        >更新信息</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import AutoTextarea from '@/components/Textarea'
import MembersField from './components/MembersField'
import SaleTypeField from './components/SaleTypeField'
import ProgressField from './components/ProgressField'
import dataModifier from '@/mixins/dataModifier'

export default {
  name: 'ProjectDescription',
  mixins: [
    dataModifier('params', 'project')
  ],
  components: {
    MembersField,
    AutoTextarea,
    SaleTypeField,
    ProgressField,
  },
  props: {
    project: {}
  },
  data: () => ({
    params: {
      sale_type: '',
      company: '',
      member_ids: [],
      progress: 0,
      name: '',
      customer_information: '',
      notes: '',
      delivery_date: '',
      signatured_date: '',
    }
  }),
  methods: {
    handleSave () {
      if (!this.isChanged) return
      const params = this.changedParams
      params.project_id = this.project.id
      axios.post('/projects/update', params)
        .then(() => {
          for (let key in params) {
            this.project[key] = params[key]
          }
          window.scrollTo(0, 0)
          this.$notify({ text: '销售信息已更新' })
        })
    }
  }
}
</script>
