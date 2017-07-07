export default {
    install(Vue, options) {
        Vue.prototype.goPage = function (url) {
            this.$router.push(url)
        }
    }
}
