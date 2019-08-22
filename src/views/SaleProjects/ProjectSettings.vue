<template>
  <div>
    <a
      @click="handleDelete"
      class="button is-danger"
    >
      删除项目
    </a>
  </div>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'Settings',
  props: {
    project: {}
  },
  methods: {
    handleDelete () {
      const params = {
        project_id: this.project.id
      }
      this.$confirm({
        title: '警告',
        content: '删除后项目无法恢复',
        handler: () => {
          axios.post('projects/delete', params)
          .then(() => {
            this.$router.push('/sale/projects')
            this.$notify({ text: '销售项目已删除'})
          })
        }
      })
    }
  }
}
</script>
