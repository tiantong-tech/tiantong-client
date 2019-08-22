<template>
  <div>
    <DateField
      text="截止日期"
      v-model="params.deadline"
    ></DateField>
    <DateField
      nullable
      text="交付日期"
      v-model="params.offered_at"
    ></DateField>
    <a
      :disabled="!isChanged"
      class="button is-info"
      @click="handleSave"
    >
      更新信息
    </a>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import dataModifier from '@/mixins/dataModifier'
import DateField from './components/DateField'

export default {
  name: 'CadDrawingDetail',
  mixins: [
    dataModifier('params', 'drawing')
  ],
  components: {
    DateField
  },
  props: {
    drawing: {}
  },
  data: () => ({
    params: {
      deadline: '',
      offered_at: null
    }
  }),
  methods: {
    handleSave () {
      if (!this.isChanged) return

      this.params.cad_drawing_id = this.drawing.id
      axios.post('/cad/drawings/update', this.params)
        .then(() => {
          this.$notify({ text: '设计图信息已更新' })
          for (let key in this.params) {
            this.drawing[key] = this.params[key]
          }
        })
    }
  }
}
</script>
