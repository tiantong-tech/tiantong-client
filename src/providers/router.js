import Vue from 'vue'
import Router from 'vue-router'
import Token from './token'
import routes from '@/routes'
import get from 'lodash/get'

Vue.use(Router)

const router = new Router({
  routes,
  linkExactActiveClass: 'is-active'
})

export default router

router.beforeEach(async (to, from, next) => {
  let path = to.path

  function handleNext () {
    if (!path) {
      // group error
      return
    } else if (to.path === path) {
      next()
    } else {
      next(path)
    }
  }
  function expectLogin () {
    Token.remove()
    path = '/login'
  }
  async function initToken () {
    if (Token.state.isLoaded) {
      return
    }

    if (Token.load()) {
      return Token.getProfile()
        .then(() => path = '/')
        .catch(expectLogin)
    } else {
      path = '/login'
    }
  }
  function checkMetaGroups () {
    const groups = get(to, 'meta.groups', [])
    if (!Token.checkGroups(groups)) {
      path = false
    }
  }

  await initToken()
  checkMetaGroups()
  handleNext()
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
