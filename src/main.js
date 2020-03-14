import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8082',
  options: { path: "/api" } //Optional options
}))

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
