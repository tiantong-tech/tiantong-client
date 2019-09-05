<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 560px">
      <header class="modal-card-head">
        <p class="modal-card-title">
          创建用户
        </p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">
            用户类型
          </label>
          <div class="field has-addons">
            <p
              class="control"
              v-for="type in types" :key="type.name"
            >
              <a
                class="button"
                @click="params.type = type.value"
                :class="params.type === type.value && 'is-focused'"
              >
                <span>{{type.text}}</span>
              </a>
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">
            用户名
          </label>
          <div class="control">
            <input
              @focus="handleFocus"
              v-model="params.username"
              type="text" class="input"
              :class="error.status && 'is-danger'"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">
            密码
          </label>
          <div class="control">
            <input
              @focus="handleFocus"
              v-model="params.password"
              type="password" class="input"
              :class="error.status && 'is-danger'"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">
            邮箱
          </label>
          <div class="control">
            <input
              @focus="handleFocus"
              v-model="params.email"
              type="text" class="input"
              :class="error.status && 'is-danger'"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">
            姓名
          </label>
          <div class="control">
            <input
              @focus="handleFocus"
              v-model="params.name"
              type="text" class="input"
              :class="error.status && 'is-danger'"
            >
          </div>
        </div>
        <div class="field">
          <label class="label">
            联系电话
          </label>
          <div class="control">
            <input
              @focus="handleFocus"
              v-model="params.phone_number"
              type="text" class="input"
              :class="error.status && 'is-danger'"
            >
          </div>
        </div>
        <p
          v-if="error.status"
          class="has-text-danger"
        >创建用户失败</p>
      </section>
      <footer class="modal-card-foot">
        <button
          @click="handleSubmit"
          class="button is-info"
        >
          创建
        </button>
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

export default {
  name: 'UserCreate',
  data: () => ({
    types: [
      { value: 'admin', text: '管理员' },
      { value: 'sale', text: '销售' },
    ],
    params: {
      type: 'admin',
      name: '',
      email: null,
      username: '',
      password: '',
      phone_number: ''
    },
    error: {
      status: false
    }
  }),
  methods: {
    handleClose () {
      this.$router.push('/users')
    },
    handleFocus () {
      this.error.status = false
    },
    handleSubmit () {
      const handleThen = () => {
        this.params.name = ''
        this.params.email = ''
        this.params.username = ''
        this.params.password = ''
        this.params.phone_number = ''
        this.$notify({ type: 'success', text: '用户已创建' })
        this.$router.push('/users')
        this.$emit('created')
      }
      const handleCatch = () => {
        this.error.status = true
      }

      axios.post('users/create', this.params)
        .then(handleThen)
        .catch(handleCatch)
    }
  }
}
</script>
