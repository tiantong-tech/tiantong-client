<template>
  <div class="container" style="width: 800px">
    <div style="height: 1rem"></div>
    <nav class="breadcrumb has-arrow-separator">
      <ul>
        <li>
          <router-link to="/news">
            新闻管理
          </router-link>
        </li>
        <li class="is-active"><a>发布新闻</a></li>
      </ul>
    </nav>
    <Form :params="params"></Form>
    <Button
      class="is-info"
      :isLoading="isLoading"
      @click="handleSubmit"
    >
      确认发布
    </Button>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
// import RichTextEditor from '@/components/Tinymce'
import Form from './Form'

export default {
  name: 'NewsCreate',
  components: {
    Form
  },
  data: () => ({
    params: {
      title: '',
      article: ''
    },
    isLoading: false
  }),
  methods: {
    handleSubmit () {
      this.isLoading = true
      axios.post('/news/create', this.params)
        .then(() => {
          this.$notify({ text: '新闻已发布' })
          this.params.title = ''
          this.params.article = ''
          this.$router.push('/news')
        })
        .catch(() => {
          this.$notify({
            type: 'danger',
            text: '请填写标题和内容'
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  created () {
    this.params.article
  }
}
</script>
