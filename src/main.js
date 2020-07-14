import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from 'components/common/toast/index'

import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

Vue.use(VueLazyLoad)

Vue.use(toast)

Vue.prototype.$bus = new Vue()

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

