import Vue from 'vue'
import Axios from '@/providers/axios.js'

export default function dataSet ({
  url = '',
  deleteUrl = '',
  params = {},
  pageSize = 20,
}) {
  const config = { url, params, pageSize }
  const context = {}
  const state = bindState(context, config)
  const methods = bindMethods(context, config)
  const computed = initComputed(context, config)

  context.$mixin = {
    methods,
    computed,
    data: () => state,
    created: () => immediate && methods.get()
  }

  return context
}

function bindState (context, config) {
  context.state = Vue.observable({
    params: {
      page: 0,
      page_size: 0,
      search: '',
      ...config.params
    },
    meta: {
      page: 0,
      page_size: 0,
      total: 0,
    },
    result: [],
    entities: {},
    isLoading: false
  })

  return context.state
}

function bindMethods (context, config) {
  const methods = {}
  const state = context.state

  methods.get = context.get = bindGet(context, config)

  return methods
}

export class dataSet {
  config = {
    url: '',
    deleteUrl: '',
    params: {},
    pageSize: 20
  }
  result = []
  entities = {}
  state = Vue.observable({
    result: [],
    entities: {},
    params: {
      page: 1,
      pageSize: 20,
      search: ''
    },
    meta: {
      page: 0,
      pageSize: 0,
      total: 0
    }
  })
  constructor ({ url = '', deleteUrl = '', params = {}, pageSize = 20 }) {
    this.config.url = url
    this.config.deleteUrl = deleteUrl
    this.params = params
    this.pageSize = pageSize
    this.state.params = Object.assign(this.state.params, params)
  }
  get (params = {}) {
    const state = this.state
    params = Object.assign({}, state.params, params)
    const handleThen = response => {
      const result = [], entities = {}
      response.data.forEach(item => {
        item.$select = false
        result.push(item.id)
        entities[item.id] = item
      })

      state.result = result
      state.entities = entities
      state.meta = response.meta
    }
    params.search || delete params.search
    params.page || delete params.page
    params.pageSize || delete params.pageSize
    state.isLoading = true

    return axios.post(config.url, params)
      .then(handleThen)
      .finally(() => state.isLoading = false)
  }
  // methods
  find (id) {
    return this.state.entities[id]
  }
  forEach (cb) {
    state.result.forEach(id => cb(state.entities[id]))
  }
  select (id, value = null) {
    const entity = this.state.entities[id]
    entity.$select = value === null ? !entity.$select : value
  }
  selectAll (value = null) {
    value = value === null ? !this.isSelectedAll() : value
    this.forEach(entity => entity.$select = value)
  }
  remove (id) {
    Vue.$delete(state.entities[id])
    this.state.result.splice(state.result.indexOf(id), 1)
  }
  delete (ids) {
    ids.forEach(id => this.remove(id))
  }
  handleDelete (ids) {
    Vue.prototype.$confirm({
      title: '删除确认',
      content: '选中的数据将被删除',
      handler: axios.post(this.deleteUrl, { ids })
        .then(() => {
          this.delete(ids)
          Vue.prototype.$notify({ text: '数据已删除' })
        })
    })
  }
  // computed
  all () {
    return this.state.result.map(id => this.state.entities[id])
  }
  isSelectedAll () {
    return this.all.every(item => item.$selected) && this.items.length
  }
  isSelectedNone () {

  }
  selectedStatus () {
    if (this.isAllSelected) return true
    else if (this.isNoneSelected) return false
    else return 'minus'
  }
  selectedIds () {
    return this.items.filter(item => item.$selected)
      .map(item => item.id)
  }
}
