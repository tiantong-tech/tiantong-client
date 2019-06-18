<template>
  <div
    v-if="!isAuthed"
    class="login-dialog"
  >
    <p class="login-title">用户登录</p>
    <section>
      <p class="control has-icons-left">
        <input
          v-model="params.username"
          @focus="isFailed = false"
          type="text" class="input"
          :class="isFailed && 'is-danger'"
        >
        <span class="icon is-left">
          <i class="iconfont icon-username"></i>
        </span>
      </p>
    </section>
    <section>
      <div class="control has-icons-left">
        <input
          v-model="params.password"
          @focus="isFailed = false"
          @keypress.enter="handleSubmit"
          type="password" class="input"
          :class="isFailed && 'is-danger'"
        >
        <span class="icon is-left">
          <i class="iconfont icon-password"></i>
        </span>
      </div>
    </section>
    <a
      @click="handleSubmit"
      :class="isLoading && 'is-loading'"
      class="button is-info is-fullwidth is-rounded"
    >
      登录 >>
    </a>
    <p
      v-if="isFailed"
      class="has-text-danger"
      style="margin: 1rem 0 -0.5rem"
    >
      登录失败，用户名或密码错误
    </p>
  </div>
</template>

<script>
import Token from '@/providers/token'
import axios from '@/providers/axios'
import store from '@/providers/store'

export default {
  name: 'Login',
  data () {
    return {
      params: {
        username: '',
        password: ''
      },
      isFailed: false,
      isLoading: false
    }
  },
  computed: {
    isAuthed: () => store.state.isAuthed
  },
  methods: {
    handleSubmit () {
      const handleThen = response => {
        const token = response.data.token

        Token.handleAuth(token)
      }
      const handleError = () => {
        this.isFailed = true
      }
      const handleFinally = () => {
        this.isLoading = false
      }

      this.isLoading = true
      axios.post('/login/username', this.params)
        .then(handleThen)
        .catch(handleError)
        .finally(handleFinally)
    }
  },
  created () {
    if (this.isAuthed) {
      this.$confirm({
        title: '重新登录',
        content: '当前用户已登录，确认将退出登录',
        handler: () => Token.handleLogout(),
        beforeClose: () => this.$router.go(-1),
      })
    }
  }
}
</script>
