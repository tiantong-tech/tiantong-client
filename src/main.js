import Vue from 'vue'
import App from './views/App/index.vue'
import router from './providers/router'
import store from './providers/store'
import directives from './providers/directives'
import components from './plugins/components'
import Token from './providers/token'
import clickoutside from './directives/clickoutside'

Vue.config.productionTip = false
Vue.use(components)
Vue.use(directives)
Vue.directive('clickoutside', clickoutside)
Vue.prototype.$groups = Token.checkGroups

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// function getApiStatus () {
//   axios.get('/api')
//     .then(response => {
//       console.log(response.data.message)
//     })
// }
