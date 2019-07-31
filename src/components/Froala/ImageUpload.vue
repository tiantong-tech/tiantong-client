<template>
  <input
    v-show="false" type="file"
    @input="handleUploadImage"
  >
</template>

<script>
import FroalaEditor from 'froala-editor/js/froala_editor.min.js'
import { upload } from '@/providers/qiniu'

export default {
  props: {
    editor: {}
  },
  methods: {
    handleUploadImage (event) {
      const file = event.target.files[0]
      upload(file).subscribe({
        complete: res => {
          const src = `http://article.resource.als-yuchuan.com/${res.key}`
          const img = `<img src="${src}" style="width: 100%; height: auto"></img>`

          this.editor.html.insert(img)
        }
      })
    }
  },
  mounted () {
    FroalaEditor.RegisterCommand('imageUploadQiniu', {
      title: '上传图片',
      icon: 'insertImage',
      callback: () => this.$el.click()
    })
  }
}
</script>
