import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/routes'
import store from './store'
import token from './token'

Vue.use(Router)

const router = new Router({
  routes,
  linkExactActiveClass: 'is-active'
})

export default router

/**
 * 1. 首次进入路由,执行 token.handleAuth
 * 2. 如果定义了 meta.groups, 则执行 groupCheck
 */
router.beforeEach(async (to, from, next) => {
  if (!store.state.isTokenChecked) {
    await token.handleAuth()
      .finally(() => store.commit('setIsTokenChecked'))
  }
  if (!to.meta.groups || !to.meta.groups.length) {
    next()
  } else {
    store.state.groups.some(group => to.meta.groups.includes(group))
      && next()
  }
})

Router.prototype.isMatched = isMatched

function isMatched ({ name, params }) {
  const route = this.app.$route
  const isMatched = route.matched.findIndex(
    route => route.name === name
  ) !== -1

  if (!isMatched || !params) return isMatched

  for (let key in params) {
    if (
      getValue(params[key]) !==
      getValue(route.params[key])
    ) {
      return false
    }
  }

  return true
}

function getValue (value) {
  return typeof value === 'number' ? value.toString() : value
}
