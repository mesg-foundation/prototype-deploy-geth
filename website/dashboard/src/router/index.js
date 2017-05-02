import Vue from 'vue'
import Router from 'vue-router'
import Dashbord from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/nodes' },
    { path: '/login', component: Login },
    { path: '/nodes', component: Dashbord }
    // { path: '/nodes/:id' },
    // { path: '/nodes/new' }
  ]
})
