import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import FirebaseMixin from '@/mixins/firebase'
import { initializeFirebase } from '@/helpers/firebase'

import '../theme/index.css'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(VueI18n)
Vue.use(ElementUI)

Vue.mixin(FirebaseMixin)

const i18n = new VueI18n({
  locale: 'en',
  messages: enLocale
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  created () {
    initializeFirebase(this.$store, this.$router)
  },
  render: h => h(App)
})
