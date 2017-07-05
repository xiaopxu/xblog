import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signup from './../views/sign_up'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
