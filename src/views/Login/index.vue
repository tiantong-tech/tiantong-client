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
    <p
      v-if="isFailed"
      class="has-text-danger"
      style="margin: -0.5rem 0 1rem"
    >
      登录失败，用户名或密码错误
    </p>
    <a
      @click="handleSubmit"
      :class="isLoading && 'is-loading'"
      class="button is-info is-fullwidth is-rounded"
    >
      登录 >>
    </a>
  </div>
</template>

<script>
import Vue from 'vue'
import Token from '@/providers/token'
import axios from '@/providers/axios'

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
    isAuthed: () => Token.state.isAuthed
  },
  methods: {
    handleSubmit () {
      const handleThen = response => {
        Token.set(response.data.token)

        Token.getProfile()
          .then(() => this.$router.push('/').catch(() => {}))
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
  beforeRouteEnter (to, from, next) {
    if (Token.state.isAuthed) {
      Vue.prototype.$confirm({
        title: '退出登陆',
        content: '确认将退出当前账户',
        handler: () => {
          Token.remove()
          next()
        }
      })
    } else {
      next()
    }
  }
}
</script>
