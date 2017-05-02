import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/nodes' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/nodes', name: 'Nodes', component: Dashboard },
    { path: '/nodes/new', name: 'CreateNode', component: Dashboard },
    { path: '/nodes/:id', name: 'Node', component: Dashboard },
    { path: '/account', name: 'Account', component: Dashboard }
  ]
})
