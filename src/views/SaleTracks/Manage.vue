<template>
  <div v-if="item" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 720px">
      <header class="modal-card-head">
        <p class="modal-card-title">详细参数</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">
            销售状态
          </label>
          <div class="control">
            <SelectableButtons
              v-model="params.status"
              :options="[
                '确认中', '已确认', '拜访中',
                '投标中', '已投标', '已取消', '已归档',
              ]"
            ></SelectableButtons>
          </div>
        </div>

        <div class="field">
          <label class="label">
            客户姓名
          </label>
          <div class="control">
            <input
              v-model="params.name"
              type="text" class="input"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">
            电话
          </label>
          <div class="control">
            <input
              v-model="params.phone_number"
              type="text" class="input"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">
            邮箱
          </label>
          <div class="control">
            <input
              v-model="params.email"
              type="text"
              class="input"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">
            项目名
          </label>
          <div class="control">
            <input
              v-model="params.project_name"
              type="text"
              class="input"
            >
          </div>
        </div>

        <div class="field">
          <label class="label">
            客户留言
          </label>
          <div class="control">
            <textarea
              v-model="params.message"
              type="text" class="textarea"
            ></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          @click="handleSave"
          class="button is-info"
          :class="isLoading && 'is-loading'"
        >
          保存
        </button>
        <button
          class="button"
          @click="close"
        >取消</button>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import SelectableButtons from '@/components/SelectableButtons'

export default {
  name: 'SaleTrackManage',
  components: {
    SelectableButtons
  },
  props: {
    item: {}
  },
  data: () => ({
    params: {
      name: '',
      email: '',
      status: '',
      message: '',
      phone_number: '',
      project_name: ''
    },
    isLoading: false
  }),
  methods: {
    close () {
      this.$emit('close')
    },
    handleSave () {
      const filter = key => this.params[key] !== this.item[key]
      const reducer = (params, key) => (params[key] = this.params[key], params)
      const params = Object.keys(this.params).filter(filter).reduce(reducer, {})

      axios.post('sale/tracks/update', {
        id: this.item.id,
        ...this.params
      })
      .then(() => {
        Object.keys(params).forEach(key => this.item[key] = params[key])
        this.$notify({
          type: 'success',
          text: '信息已更新'
        })
        this.close()
      })
      .finally(() => this.isLoading = false)
    },
    reset () {
      Object.keys(this.params).forEach(key => this.params[key] = this.item[key])
    }
  },
  watch: {
    item: {
      immediate: true,
      handler (value) {
        value && this.reset()
      }
    }
  }
}
</script>
