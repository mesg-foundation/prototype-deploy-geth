import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/login'
import Signup from '@/components/signup'
import ForgotPassword from '@/components/forgot-password'
import CreateNode from '@/components/create-node'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/nodes' },

    // Login etc..
    { path: '/login', name: 'Login', component: Login },
    { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/sigup', name: 'Signup', component: Signup },

    // Nodes
    { path: '/nodes', name: 'Nodes', component: Dashboard },
    { path: '/nodes/new', name: 'CreateNode', component: CreateNode },
    { path: '/nodes/:id', name: 'Node' },

    // Account
    { path: '/account', name: 'Account' }
  ]
})
