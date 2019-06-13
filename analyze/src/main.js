import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
Vue.use(AsyncComputed)
Vue.config.productionTip = false
Vue.use(Vuetify)
// DEFAULT EVENT KEY
Vue.prototype.$eventKey = 'postSeasonTesting'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
