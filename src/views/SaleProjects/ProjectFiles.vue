<template>
  <div>
    <router-view></router-view>
    <div class="is-flex is-vcentered">
      <p class="is-size-5 ">文件列表</p>
      <div class="is-flex-auto"></div>
      <div
        v-if="!isUploading"
        class="file is-info"
      >
        <label class="file-label">
          <input
            type="file" class="file-input"
            @input="handleFileInput"
          >
          <span class="file-cta" style="width: 100px">
            <span class="file-label">
              上传文件
            </span>
          </span>
        </label>
      </div>
      <a
        v-else
        class="button is-info is-loading"
        style="width: 100px"
      >
        文件上传
      </a>
    </div>
    <div style="height: 0.75rem"></div>
    <table class="table is-vcentered is-fullwidth is-nowrap is-hoverable is-centered">
      <thead>
        <th style="width: 1px">
          #
        </th>
        <th style="text-align: left">文件名 </th>
        <th style="width: 1px">文件大小</th>
        <th style="width: 100px">上传者</th>
        <th style="width: 160px">创建日期</th>
      </thead>
      <tbody>
        <ProjectFileItem
          v-for="(file, key) in files" :key="file.id"
          :index="key" :file="file" :project="project"
          @deleted="getFiles"
        ></ProjectFileItem>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import { uploadByToken } from '@/providers/qiniu'
import ProjectFileItem from './ProjectFileItem'

export default {
  name: 'Files',
  components: {
    ProjectFileItem,
  },
  props: {
    project: {}
  },
  data: () => ({
    files: [],
    isChecked: false,
    isLoading: false,
    isUploading: false,
  }),
  methods: {
    handleFileInput (event) {
      const file = event.target.files[0]
      const { name, size } = file
      this.isUploading = true
      axios.post('projects/files/upload', { name, size })
        .then(response => {
          const { file_id, token } = response.data
          const handleConfirm = res => {
            axios.post('/projects/files/confirm', {
              file_id,
              link: res.key,
              project_id: this.project.id,
            }).then(() => {
              this.getFiles()
              this.isUploading = false
              this.$notify({ text: '文件已上传' })
            })
          }

          uploadByToken(file, token).subscribe({
            complete: handleConfirm
          })
        })
    },
    getFiles () {
      this.isLoading = true
      axios.post('/projects/files/search', { project_id: this.project.id})
        .then(response => {
          this.files = response.data
          this.isLoading = false
        })
    }
  },
  created () {
    this.getFiles()
  }
}
</script>
