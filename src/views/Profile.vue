<template>
  <div class="container" style="width: 600px">
    <div style="height: 1.5rem"></div>
    <h1 class="is-size-4 has-text-weight-bold">基本信息</h1>
    <div style="height: 0.75rem"></div>
    <div class="field">
      <label class="label">用户名</label>
      <div class="control">
        <input
          type="text" class="input"
          v-model="params.username"
        >
      </div>
    </div>
    <div class="field">
      <label class="label">邮箱</label>
      <div class="control">
        <input
          type="text" class="input"
          v-model="params.email"
        >
      </div>
    </div>
    <div class="field">
      <label class="label">姓名</label>
      <div class="control">
        <input
          type="text" class="input"
          v-model="params.name"
        >
      </div>
    </div>
    <div class="field">
      <label class="label">联系电话</label>
      <div class="control">
        <input
          type="text" class="input"
          v-model="params.phone_number"
        >
      </div>
    </div>
    <div class="field">
      <div class="control">
        <Button
          class="is-info"
          @click="handleSave"
          :disabled="!isModified"
        >
          更新信息
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import dataModifier from '@/mixins/data-editor.js'
import token from '@/providers/token'

export default {
  name: 'Profile',
  mixins: [
    new dataModifier({
      data: 'user',
      url: 'user/update'
    })
  ],
  data: () => ({
    params: {
      id: 0,
      name: '',
      email: '',
      username: '',
      phone_number: ''
    }
  }),
  computed: {
    user () {
      return token.state.user
    }
  },
  methods: {

  }
}
</script>
