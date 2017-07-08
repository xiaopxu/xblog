export default {
    install(Vue, options) {
        Vue.prototype.goPage = function (url, param) {
            if (param) {
                this.$router.push(url + param)
            } else {
                this.$router.push(url)
            }

        }
    }
}
