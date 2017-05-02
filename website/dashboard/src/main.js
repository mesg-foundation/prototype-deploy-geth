import Vue from 'vue'
import ElementUI from 'element-ui'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import FirebaseMixin from '@/mixins/firebase'
import { initializeFirebase } from '@/helpers/firebase'

import '../theme/index.css'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(ElementUI)
Vue.mixin(FirebaseMixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    initializeFirebase(this.$store, this.$router)
  },
  render: h => h(App)
})
