<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">创建项目</p>
      </header>
      <section class="modal-card-body">
        <SaleTypeField v-model="params.sale_type"></SaleTypeField>
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
          <label class="label">备注信息</label>
          <div class="control">
            <AutoTextarea v-model="params.notes"></AutoTextarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          @click="handleSubmit"
          class="button is-info"
        >确认</button>
        <button
          class="button"
          @click="handleClose"
        >取消</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import AutoTextarea from '@/components/Textarea'
import MembersField from './components/MembersField'
import SaleTypeField from './components/SaleTypeField'
import ProgressField from './components/ProgressField'

export default {
  name: 'Create',
  components: {
    MembersField,
    AutoTextarea,
    SaleTypeField,
    ProgressField,
  },
  data: () => ({
    params: {
      type: 'sale',
      sale_type: 'hoister',
      progress: '交流中',
      name: '',
      notes: '',
      member_ids: [],
      customer_information: ''
    },
    types: [
      { value: 'hoister', text: '提升机' }
    ],
    isLoading: false
  }),
  methods: {
    handleClose () {
      this.$router.go(-1)
    },
    handleSubmit () {
      this.isLoading = true
      axios.post('/projects/create', this.params)
        .then(response => {
          this.$router.push(`/sale/projects/${response.data.project_id}`)
          this.$notify({ text: '项目以创建' })
        })
        .finally(() => this.isLoading = false)
    }
  }
}
</script>
