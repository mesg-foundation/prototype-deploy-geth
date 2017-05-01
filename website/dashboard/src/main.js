import Vue from 'vue'
import Vuetify from 'vuetify'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import FirebaseMixin from '@/mixins/firebase'
import { initializeFirebase } from '@/helpers/firebase'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(Vuetify)
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
