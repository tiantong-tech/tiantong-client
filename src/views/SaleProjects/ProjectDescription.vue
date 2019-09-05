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
        <DateField
          width="100%"
          text="签约日期"
          v-model="params.signature_date"
        ></DateField>
      </div>
      <div class="column">
        <DateField
          width="100%"
          text="交付日期"
          v-model="params.delivery_date"
        ></DateField>
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
import AutoTextarea from '@/components/Textarea'
import MembersField from './components/MembersField'
import SaleTypeField from './components/SaleTypeField'
import ProgressField from './components/ProgressField'
import dataModifier from '@/mixins/data-editor.js'
import DateField from './components/DateField'

export default {
  name: 'ProjectDescription',
  mixins: [
    new dataModifier({
      data: 'project',
      paramsId: 'project_id',
      url: '/projects/update'
    })
  ],
  components: {
    DateField,
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
      delivery_date: null,
      signature_date: null,
    }
  }),
  methods: {

  }
}
</script>
