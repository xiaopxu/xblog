import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sign from './../views/sign'
import SignIn from './../views/sign_in'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'sign-in',
            component: SignIn
        },
        {
            path: '/sign',
            name: 'sign',
            component: Sign
        }
    ]
})
