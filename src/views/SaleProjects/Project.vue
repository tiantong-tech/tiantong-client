<template>
  <div
    v-if="!isLoading && project"
    class="container"
  >
    <div style="height: 1.5rem"></div>
    <div class="columns">
      <div
        class="column is-narrow is-hidden-touch"
        style="width: 220px"
      >
        <ProjectMenu
          :project="project" :schema_id="schema_id"
        ></ProjectMenu>
      </div>
      <div class="column">
        <div class="is-flex is-vcentered">
          <nav class="breadcrumb is-medium" style="margin-bottom: 0">
            <ul>
              <li>
                <router-link to="/sale/projects">销售项目</router-link>
              </li>
              <li class="is-active">
                <a>
                  {{project.name || '项目详情'}}
                </a>
              </li>
            </ul>
          </nav>
          <div class="is-flex-auto"></div>
          <div>
            <a
              class="nav-menu icon is-medium is-hidden-desktop"
              @click="isMenuActive = !isMenuActive"
            >
              <i class="iconfont icon-menu"></i>
            </a>
          </div>
        </div>
        <div style="height: 0.75rem"></div>
        <ProjectMenu
          v-show="isMenuActive"
          class="is-hidden-desktop"
          style="margin-bottom: 1rem"
          :project="project" :schema_id="schema_id"
        ></ProjectMenu>
        <router-view
          :project="project"
          :key="project_id + '' + schema_id + '' + quotation_id"
          :schema="schemaData[schema_id]"
          :drawing="schema_id && schemaData[schema_id].cad_drawing"
          :quotation="quotation_id && quotationData[quotation_id]"
          @refresh="handleRefresh"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import ProjectMenu from './components/ProjectMenu'

export default {
  name: 'SaleProject',
  components: {
    ProjectMenu
  },
  props: {
    schema_id: {},
    project_id: {},
    quotation_id: {},
  },
  data: () => ({
    project: false,
    isLoading: false,
    isMenuActive: false,
  }),
  computed: {
    baseUrl () {
      return `/sale/projects/${this.project_id}/`
    },
    schemaData () {
      const data = {}

      this.project.design_schemas.forEach(schema => {
        data[schema.id] = schema
      })

      return data
    },
  },
  methods: {
    getDataSource () {
      return axios.post('/projects/detail', { project_id: this.project_id})
        .then(response => this.project = response.data)
        .finally(() => this.isLoading = false)
    },
    handleRefresh ({ schema_id, drawing_id } = {}) {
      this.getDataSource()
        .then(() => {
          if (schema_id) {
            this.$router.push(this.baseUrl + `schemas/${schema_id}`)
          }
          if (drawing_id) {
            this.$router.push(this.baseUrl + `schemas/${this.schema_id}/drawing`)
          }
        })
    }
  },
  created () {
    this.isLoading = true
    this.getDataSource()
  }
}
</script>
