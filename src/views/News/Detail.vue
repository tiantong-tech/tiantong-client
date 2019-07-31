<template>
  <div
    v-if="!isLoading"
    class="container"
    style="width: 800px"
  >
    <div style="height: 1rem"></div>
    <nav class="breadcrumb has-arrow-separator">
      <ul>
        <li>
          <router-link to="/news">
            新闻管理
          </router-link>
        </li>
        <li class="is-active">
          <a>新闻编辑</a>
        </li>
      </ul>
    </nav>
    <Form :params="params"></Form>
    <a
      class="button is-info"
      :disabled="!isChanged"
      @click="isChanged && handleSave()"
    >
      确认修改
    </a>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import Form from './Form'

export default {
  props: {
    id: {},
  },
  components: {
    Form
  },
  data: () => ({
    news: {
      id: 0,
      title: '',
      article: '',
      anthor_id: 0,
      created_at: 0,
      is_visible: false
    },
    params: {
      title: '',
      article: ''
    },
    isLoading: false
  }),
  computed: {
    isChanged () {
      return !!Object.keys(this.params)
        .some(key => this.params[key] !== this.news[key])
    }
  },
  methods: {
    handleSave () {
      axios.post('/news/update', {
        id: this.news.id,
        data: this.params
      })
      .then(() => {
        this.$notify({ text: '信息已更新' })
        this.$router.push('/news')
      })
      .catch(() => {
        this.$notify({
          type: 'danger',
          text: '信息修改失败'
        })
      })
    }
  },
  created () {
    this.isLoading = true
    axios.post('/news/detail', {
      id: this.id
    })
    .then(response => {
      this.news = response.data
      this.params.title = this.news.title
      this.params.article = this.news.article
    })
    .finally(() => {
      this.isLoading = false
    })
  }
}
</script>
