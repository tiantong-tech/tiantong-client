<template>
  <tr
    @click="handleRowClick()"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    style="cursor: pointer; height: 56px"
  >
    <td>
      {{index + 1}}
    </td>
    <td>
      <div class="is-flex is-vcentered">
        <span>{{file.name}}</span>
        <span class="is-flex-auto"></span>
        <div class="field has-addons">
          <div class="control">
            <a
              v-show="isHovered"
              class="button is-outlined is-info"
              style="font-size: 0.875rem"
              @click.stop="handleDelete"
            >
              删除
            </a>
          </div>
        </div>
      </div>
    </td>
    <td class="has-text-left">
      <FileSize :value="file.size"></FileSize>
    </td>
    <td>{{file.user.name}}</td>
    <td>
      <TimeWrapper :value="file.created_at">
      </TimeWrapper>
    </td>
  </tr>
</template>

<script>
import axios from '@/providers/axios'
import FileSize from '@/components/wrappers/FileSize'
import TimeWrapper from '@/components/wrappers/Time'

export default {
  name: 'FileItem',
  components: {
    FileSize,
    TimeWrapper
  },
  data: () => ({
    isHovered: false
  }),
  props: {
    file: {},
    index: {}
  },
  methods: {
    handleRowClick () {
      window.open(`http://tiantong.als-yuchuan.com/${this.file.link}`)
    },
    handleDelete () {
      const params = {
        project_id: this.$parent.project.id,
        file_ids: [ this.file.id ]
      }
      this.$confirm({
        title: '删除文件',
        content: '删除后文件将无法恢复',
        handler: () => axios.post('/projects/files/delete', params)
          .then(() => { 
            this.$notify({ text: '文件已删除' })
            this.$emit('deleted')
          })
      })
    }
  }
}
</script>
