export default {
    install(Vue, options) {
        /**
         * localStorage set方法
         *
         * @param {string} key
         * @param {string} value
         */
        Vue.prototype.setStorage = function(key, value) {
            localStorage.setItem(key, value)
        }

        /**
         * localStorage get方法
         *
         * @param {string} key
         */
        Vue.prototype.getStorage = function(key) {
            return localStorage.getItem(key)
        }
    }
}