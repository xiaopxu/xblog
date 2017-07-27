// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import iView from 'iview' import 'iview/dist/styles/iview.css'
import element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './../static/font-awesome-4.7.0/css/font-awesome.min.css'
import $ from 'jquery'
//引入自定义插件
import http from './util/http.js'
import validate from './util/validate.js'
import common from './util/common.js'
import filter from './util/filter.js'
import cookie from './util/cookie.js'
import globalData from './util/global_data.js'

Vue.use(element);
window.$ = $
    // Vue.use(iView);

Vue.use(http);
Vue.use(validate);
Vue.use(common);
Vue.use(filter);
Vue.use(cookie);
Vue.use(globalData);

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