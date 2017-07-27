let data = {
    isSignin: false,
    userId: '',
    userName: ''
}

export default {
    install(Vue, options) {
        Vue.prototype.setGlobalData = function(key, value) {
            data[key] = value
        }

        Vue.prototype.getGlobalData = function(key) {
            return data[key]
        }
    }
}