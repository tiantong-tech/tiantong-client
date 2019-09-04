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
import dataModifier from '@/mixins/data-editor.js'
import DateField from './components/DateField'

export default {
  name: 'CadDrawingDetail',
  mixins: [
    new dataModifier({
      data: 'drawing',
      paramsId: 'cad_drawing_id',
      url: '/cad/drawings/update',
    })
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

  }
}
</script>
