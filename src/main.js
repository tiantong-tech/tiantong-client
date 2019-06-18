import Vue from 'vue'
import App from './views/App/index.vue'
import router from './providers/router'
import store from './providers/store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
