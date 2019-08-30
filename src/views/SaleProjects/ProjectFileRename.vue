<template>
  <td @click.stop="() => {}">
    <div class="background" @click="$emit('close')"></div>
    <div
      class="field has-addons"
      style="margin-left: -0.625rem"
    >
      <div class="control is-expanded">
        <input
          ref="input"
          v-model.trim="value"
          type="text" class="input"
          @keypress.enter="handleSave"
        >
      </div>
      <div class="control">
        <a
          @click="handleSave"
          class="button is-success"
        >保存</a>
      </div>
    </div>
  </td>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'FileRename',
  props: {
    file: {}
  },
  data: () => ({
    value: '',
    suffix: ''
  }),
  methods: {
    handleSave () {
      let name = this.value
      const [ , suffix ] = this.getFileName(this.value)
      if (!suffix) {
        name += this.suffix
      }

      if (!this.value || name === this.file.name) {
        this.$emit('close')
        return
      }

      const params = {
        name,
        file_id: this.file.id,
      }
      axios.post('/files/update', params)
        .then(() => {
          this.$notify({ text: '文件已重命名' })
          this.$emit('renamed', name)
          this.$emit('close')
        })
    },
    getFileName (name) {
      let prefix = '', suffix = ''
      const index = name.indexOf('.')
      if (index !== -1) {
        prefix = name.slice(0, index)
        suffix = name.slice(index)
      } else {
        prefix = name
        suffix = ''
      }

      return [ prefix, suffix ]
    }
  },
  created () {
    const [ prefix, suffix ] = this.getFileName(this.file.name)
    this.value = prefix
    this.suffix = suffix
  },
  mounted () {
    this.$refs.input.focus()
  }
}
</script>
