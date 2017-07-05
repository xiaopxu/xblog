import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signup from './../views/sign_up'
import Login from './../views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
