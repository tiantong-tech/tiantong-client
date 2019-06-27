<template>
  <div v-if="item" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 1200px">
      <header class="modal-card-head">
        <p class="modal-card-title">详细参数</p>
      </header>
      <section class="modal-card-body">
        <Hoister :data="item.data" ref="type"></Hoister>
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
import Hoister from './types/Hoister'

export default {
  name: 'DetailHoister',
  components: {
    Hoister
  },
  props: {
    item: {}
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.$refs.type.reset()
    },
    handleSave () {
      const data = this.$refs.type.$data

      this.isLoading = true
      axios.post('sale/tracks/update', {
        id: this.item.id,
        data
      })
      .then(() => {
        this.item.data = data
        this.$notify({
          type: 'success',
          text: '数据已更新'
        })
        this.close()
      })
      .finally(() => this.isLoading = false)
    }
  }
}
</script>
