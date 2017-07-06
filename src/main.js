// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './../static/font-awesome-4.7.0/css/font-awesome.min.css'
//引入自定义插件
import http from './util/http.js'

// Vue.use(iView);
Vue.use(http);
Vue.use(element);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
