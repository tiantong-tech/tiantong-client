import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        auth: { only: ['guest', ''] }
      },
      component: () => import('@/views/Home/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/Users/index.vue'),
      children: [
        {
          path: 'create',
          name: 'user create',
          component: () => import('@/views/Users/Create.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'not found',
      component: () => import('@/views/NotFound.vue')
    }
  ]
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
