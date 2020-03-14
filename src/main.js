import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8082',
  options: { path: "/api" } //Optional options
}))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
