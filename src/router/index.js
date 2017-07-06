import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sign from './../views/sign'
import Index from './../views/index'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/sign',
            name: 'sign',
            component: Sign
        }
    ]
})
