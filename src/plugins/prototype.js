import store from '@/providers/store'

export default {
  install (Vue) {
    Vue.prototype.$groups = checkGroups
  }
}

function checkGroups (...groups) {
  return store.state.isAuthed &&
    groups.some(group => store.state.groups.includes(group))
}
