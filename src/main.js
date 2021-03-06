import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(new VueSocketIO({
  debug: true,
  connection: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''),
  options: { path: "/api" } //Optional options
}))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
