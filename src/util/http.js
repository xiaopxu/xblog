import axios from 'axios'
export default {
  install(Vue, options) {
    Vue.prototype.post = function(param) {
      console.log('请求接口：', param.url)
      let promise = new Promise((resolve, reject) => {
        axios.post(param.url, param.data)
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              resolve(res.data.data)
            } else {
              this.$Message.error(res.data.msg)
              reject(res.data.msg)
            }
          })
      })
      return promise
    }
  }
}
