import axios from 'axios'
export default {
  install(Vue, options) {
    Vue.prototype.post = function(param) {
      console.log('=============================== 发起请求 =======================================')
      console.log('请求接口：', 'http://localhost:3000/' + param.url)
      console.log('请求参数：', param.data)
      let promise = new Promise((resolve, reject) => {
        axios.post(param.url, param.data)
          .then(res => {
            console.log('相应数据：', res.data)
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
