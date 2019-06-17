<template>
  <div class="login-dialog">
    <p class="login-title">
      用户登录
    </p>
    <section>
      <p class="control has-icons-left">
        <input
          v-model="params.username"
          @focus="isFailed = false"
          type="text" class="input"
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
          type="password"
          class="input"
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
  methods: {
    handleSubmit () {
      const handleThen = response => {
        const token = response.data.token

        Token.handle(token)
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
  }
}
</script>
