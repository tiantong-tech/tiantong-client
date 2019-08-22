<template>
  <div
    v-if="!isLoading && project"
    class="container"
  >
    <div style="height: 1.5rem"></div>
    <div class="columns">
      <div class="column is-narrow">
        <aside
          class="menu is-unselectable"
          style="width: 220px"
        >
          <p class="menu-label">
            项目信息
          </p>
          <ul class="menu-list">
            <li
              v-for="menu in menus"
              :key="menu.route"
              v-class:has-text-danger="true"
            >
              <router-link :to="baseUrl + menu.path">
                {{menu.text}}
              </router-link>
            </li>
          </ul>
          <p class="menu-label is-flex">
            <span>设计依赖书</span>
            <span class="is-flex-auto"></span>
            <!-- <a>添加</a> -->
          </p>
          <ul class="menu-list">
            <li v-for="schema in schemas" :key="schema.id">
              <router-link :to="baseUrl + `schemas/${schema.id}`">
                {{schema.name || `设计依赖书 ${schema.id}`}}
              </router-link>
              <ul v-if="schema.is_completed">
                <router-link
                  id="sale-project-menu-add"
                  v-if="!schema.cad_drawing"
                  :to="`${baseUrl}schemas/${schema.id}/drawings/create`"
                >
                  申请设计图
                </router-link>
                <router-link
                  v-else
                  :to="`${baseUrl}schemas/${schema.id}/drawing`"
                >
                  设计图
                </router-link>
                <router-link
                  v-if="!schema.quotation_ids.length"
                  id="sale-project-menu-add"
                  :to="`${baseUrl}schemas/${schema.id}/quotations/create`"
                >
                  申请报价
                </router-link>
                <template v-else>
                  <router-link
                    v-for="id in schema.quotation_ids" :key="id"
                    :to="`${baseUrl}schemas/${schema.id}/quotations/${id}`"
                  >
                    {{getQuotationTypeText(quotationData[id].type)}}
                  </router-link>
                </template>
              </ul>
            </li>
            <li>
              <router-link
                id="sale-project-menu-add"
                :to="baseUrl + 'schemas/create'"
              >
                + 设计依赖书
              </router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <nav class="breadcrumb is-medium">
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
import { getQuotationTypeText } from './components/quotation.js'

export default {
  name: 'SaleProject',
  props: {
    schema_id: {},
    project_id: {},
    quotation_id: {},
  },
  data: () => ({
    project: false,
    isLoading: false,
    menus: [
      { path: '', text: '基本信息', dev: true },
      { path: 'activities', text: '活动', dev: true },
      { path: 'files', text: '文件', dev: true },
      { path: 'settings', text: '设置', dev: true },
    ]
  }),
  computed: {
    baseUrl () {
      return `/sale/projects/${this.project_id}/`
    },
    schema () {
      return this.schemaData[this.schema_id]
    },
    schemaData () {
      const data = {}

      this.project.design_schemas.forEach(schema => {
        data[schema.id] = schema
      })

      return data
    },
    schemas () {
      return this.project.design_schema_ids.map(id => this.schemaData[id])
    },
    quotationData () {
      const data = {}
      this.schemas.forEach(schema => {
        schema.quotations.forEach(item => data[item.id] = item)
      })

      return data
    }
  },
  methods: {
    getQuotationTypeText,
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
