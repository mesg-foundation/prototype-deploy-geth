import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import NewPassword from '@/components/NewPassword.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/nodes' },

    // Login etc..
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgot-password', name: 'ForgotPassword', component: NewPassword },
    { path: '/sigup', name: 'Signup', component: Signup },

    // Nodes
    { path: '/nodes', name: 'Nodes', component: Dashboard },
    { path: '/nodes/new', name: 'CreateNode' },
    { path: '/nodes/:id', name: 'Node' },

    // Account
    { path: '/account', name: 'Account' }
  ]
})
