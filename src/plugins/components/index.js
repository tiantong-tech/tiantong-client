import Radio from './Radio'
import Checkbox from './Checkbox'
import Pagination from './Pagination'

export default {
  install (Vue) {
    Vue.component('Radio', Radio)
    Vue.component('Checkbox', Checkbox)
    Vue.component('Pagination', Pagination)
  }
}
