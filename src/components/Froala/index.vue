<template>
  <div>
    <ImageUpload :editor="editor"></ImageUpload>
    <div id="froala" ref="froala"></div>
  </div>
</template>

<script>
import FroalaEditor from 'froala-editor/js/froala_editor.min.js'
import ImageUpload from './ImageUpload'
import './plugins'

export default {
  name: 'Froala',
  components: {
    ImageUpload
  },
  props: {
    value: {}
  },
  data: () => ({
    editor: {}
  }),
  mounted () {
    const vm = this

    vm.editor = new FroalaEditor(this.$refs.froala, {
      heightMin: 400,
      language: 'zh_cn',
      placeholderText: '文章内容..',
      toolbarBottom: false,
      charCounterCount: true,
      embedlyEditButtons: [],
      listAdvancedTypes: false,
      paragraphFormat: {
        H1: 'Heading 1',
        H2: 'Heading 2',
        H3: 'Heading 3',
        N: 'Normal'
      },
      toolbarButtons: {
        moreText: {
          buttons: [
            'bold', 'italic', 'underline', '|',
            'paragraphFormat', 'align', '|',
            'formatOLSimple', 'formatUL', '|',
            'imageUploadQiniu', 'imageUpload'
          ],
          align: 'left',
          buttonsVisible: 10
        },
        moreMisc: {
          buttons: ['undo', 'redo'],
          align: 'right'
        }
      },
      // imagePaste: false,
      // imagePasteProcess: false,
      // imageDefaultAlign: 'left',
      // imageDefaultDisplay: 'block',
      imageEditButtons: [
        'imageCaption', 'imageDisplay', 'imageAlign',
      ],
      events: {
        initialized () {
          vm.value && this.html.insert(vm.value)
        },
        contentChanged () {
          vm.$emit('input', this.html.get())
        }
      }
    })
    vm.editor.$el.addClass('content')
  }
}
</script>

<style lang="sass">
.fr-box 
  .second-toolbar,
  .fr-toolbar.fr-top
    border-radius: 0
    -moz-border-radius: 0
    -webkit-border-radius: 0
  #logo
    display: none
.fr-view .fr-img-caption .fr-img-wrap>span,
.fr-box.fr-basic .fr-element
  font-size: 1rem
.fr-view img.fr-dii
  display: block
  align: left
a[href="https://www.froala.com/wysiwyg-editor?k=u"]
  position: absolute
  top: -999px
</style>
