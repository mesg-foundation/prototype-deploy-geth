import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import FirebaseMixin from '@/mixins/firebase'
import MomentMixin from '@/mixins/moment'
import { initializeFirebase } from '@/helpers/firebase'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

Vue.use(Vuetify)
Vue.use(VueI18n)

Vue.mixin(FirebaseMixin)
Vue.mixin(MomentMixin)

initializeFirebase(store, router)

const i18n = new VueI18n({
  locale: 'en'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
