import Axios from '@/providers/axios'

export default function ({
  url = '',
  searchUrl = false,
  deleteUrl = false,
  pageSize = 20,
  params = {}
}) {
  url += '/'
  const config = { url, searchUrl, deleteUrl, pageSize, params }
  const mixin = {}
  mixin.data = initData(config)
  mixin.methods = initMethods(config)
  mixin.computed = initComputed(config)
  mixin.created = function () {
    this.getDataSet()
  }

  return mixin
}

const initData = () => () => ({
  result: [],
  entities: {},
  meta: {
    page: 0,
    page_size: 0,
    total: 0
  },
  params: {
    search: ''
  },
  isLoading: false,
})

const initComputed = () => ({
  dataSet () {
    return this.result.map(id => this.entities[id])
  },
  isSelectedAll () {
    return this.dataSet.every(entity => entity.$selected) && this.dataSet.length
  },
  isSelectedNone () {
    return !this.dataSet.some(entity => entity.$selected)
  },
  selectedStatus () {
    if (this.isSelectedAll) return true
    else if (this.isSelectedNone) return false
    else return 'minus'
  },
  selectedIds () {
    return this.dataSet.filter(entity => entity.$selected)
      .map(entity => entity.id)
  }
})

const initMethods = config => ({
  getDataSet ({ page = 1, pageSize } = {}) {
    if (this.isLoading) return

    const handleBefore = () => {
      this.isLoading = true
      const params = Object.assign(this.params, {
        page, pageSize
      })
      params.pageSize = pageSize || config.pageSize
      params.search || delete params.search
    }
    const handleThen = response => {
      const { meta, data } = response.data
      this.meta = meta
      const result = [], entities = {}

      data.forEach(entity => {
        entity.$selected = false
        result.push(entity.id)
        entities[entity.id] = entity
      })

      this.result = result
      this.entities = entities
    }
    const handleFinally = () => {
      this.isLoading = false
    }

    handleBefore()
    return Axios.post(config.url + 'search', this.params)
      .then(handleThen)
      .finally(handleFinally)
  },
  changePage (page) {
    this.getDataSet({ page })
  },
  find (id) {
    return this.entities[id]
  },
  select (id) {
    this.entities[id].$selected = !this.entities[id].$selected
  },
  selectAll () {
    const value = !this.selectedStatus

    this.dataSet.forEach(entity => entity.$selected = value)
  },
  remove (id) {
    this.$delete(this.entities[id])
    this.result.splice(this.result.indexOf(id), 1)
  },
  handleDelete ({
    notifyText = '信息已删除',
    confirmTitle = '删除确认',
    confirmContent = '选中的数据将被删除'
  }) {
    const ids = this.selectedIds

    this.$confirm({
      title: confirmTitle,
      content: confirmContent,
      handler: () => Axios.post(config.url + 'delete', { ids })
        .then(() => {
          this.getDataSet({ page: this.params.page })
          this.$notify({ text: notifyText })
        })
    })
  }
})
