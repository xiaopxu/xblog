export default {
    install(Vue, options) {
        /**
         * 路由跳转
         * 
         * @param {string} url 路由节点
         * @param {string} param 路由参数
         */
        Vue.prototype.goPage = function (url, param) {
            if (param) {
                this.$router.push(url + '/' + param)
            } else {
                this.$router.push(url)
            }
        }
    }
}
