import Vue from 'vue'
import App from './views/App/index.vue'
import router from './providers/router'
import store from './providers/store'
import directives from './providers/directives'
import components from './plugins/components'
import prototype from './plugins/prototype'

Vue.config.productionTip = false
Vue.use(components)
Vue.use(prototype)
Vue.use(directives)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
