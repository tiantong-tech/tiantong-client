<template>
  <div>
    <div class="field" style="margin-bottom: 0.5rem">
      <div class="control">
        <input
          v-model="params.title"
          class="input is-large has-text-weight-bold"
          style="border-radius: 0"
          type="text" placeholder="标题"
        >
      </div>
    </div>
    <Editor v-model="params.article"></Editor>
    <div style="height: 0.5rem"></div>
  </div>
</template>

<script>
import Editor from '@/components/Froala'

export default {
  name: 'Form',
  components: {
    Editor
  },
  props: {
    params: {}
  }
}
</script>
