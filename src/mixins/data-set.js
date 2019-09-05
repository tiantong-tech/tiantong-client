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
      const { page, page_size, total, data } = response.data
      this.meta.page = page
      this.meta.pageSize = page_size
      this.meta.total = total
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

// /**
//  * 为没有 id 的数据自动分配一个 uuid
//  */
// const state = {
//   id: 0,
//   hasId: true,
//   paginate: true,
// }

// function dataSet ({
//   url,
//   deleteUrl,
//   params,
//   pageSize = 20
// }) {
//   const config = { url, deleteUrl, params, pageSize }
//   const mixin = {}


//   return mixin
// }

// function initData (mixin, config) {
//   mixin.data = () => ({
//     result: [],
//     entities: {},
//     meta: {
//       page: 0,
//       page_size: 0,
//       total: 0
//     },
//     params: {
//       page: 1,
//       page_size: 15,
//       search: '',
//       ...config.params
//     },
//     isLoading: false
//   })
// }

// function bindMethods (mixin, config) {

// }

// export default {
//   data: () => ({
//     url: '',
//     list: [],
//     data: {},
//     meta: {
//       page: 0,
//       page_size: 0,
//       total: 0
//     },
//     params: {
//       page: 1,
//       page_size: 15,
//       search: ''
//     },
//     isLoading: false,
//   }),
//   computed: {
//     item () {
//       const id = this.$route.params.id
  
//       return id && this.data[id]
//     },
//     items () {
//       return this.list.map(id => this.data[id])
//     },
//     isAllSelected () {
//       return this.items.every(item => item.$selected) && this.items.length
//     },
//     isNoneSelected () {
//       return !this.items.some(item => item.$selected)
//     },
//     selectedStatus () {
//       if (this.isAllSelected) return true
//       else if (this.isNoneSelected) return false
//       else return 'minus'
//     },
//     selectedIds () {
//       return this.items.filter(item => item.$selected)
//         .map(item => item.id)
//     }
//   },
//   methods: {
//     get () {
//       const handleBefore = () => {
//         this.list = []
//         this.data = {}
//         this.isLoading = true
//       }
//       const handleThen = response => {
//         const { page, page_size, total, data } = dataSource
//         this.meta.page = page
//         this.meta.pageSize = page_size
//         this.meta.total = total
//         if (data[0] && !data[0].id) {
//           state.hasId = false
//         }
//         data.forEach(item => {
//           item.$selected = false
//           state.hasId || (item.id = state.id++)
//           this.list.push(item.id)
//           this.$set(this.data, item.id, item)
//         })
//       }
//       const handleCatch = error => {
//         throw error
//       }
//       const handleFinally = () => {
//         this.isLoading = false
//       }
  
//       handleBefore()
//       axios.post(this.url, this.params)
//         .then(handleThen)
//         .catch(handleCatch)
//         .finally(handleFinally)
//     },
//     initialize ({ url = '', params = {}, hasId = true }) {
//       this.url = url
//       state.hasId = hasId
//       Object.keys(params).forEach(
//         key => this.$set(this.params, key, params[key])
//       )
//       this.getDataSource()
//     },
//     refresh () {
//       this.getDataSource()
//     },
//     search () {
//       this.params.page = 1
//       this.getDataSource()
//     },
//     changePage (page) {
//       this.params.page = page
//       this.getDataSource()
//     },
//     changePageSize (pageSize) {
//       this.params.page_size = pageSize
//       this.getDataSource()
//     },
//     handleSelect (id) {
//       this.data[id].$selected = !this.data[id].$selected
//     },
//     handleSelectAll () {
//       const value = !this.selectedStatus
  
//       this.items.forEach(item => item.$selected = value)
//     }
//   },
// }
