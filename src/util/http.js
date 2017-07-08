import axios from 'axios'
export default {
    install(Vue, options) {
        /**
         * post请求
         * 
         * @param {object} param 请求参数 {url:'api/xxx',data:{xx:xx}}
         * @return {promise}
         */
        Vue.prototype.post = function (param) {

            //获取参数
            let url = param.url
            let data = param.data || ''

            //请求参数打印
            console.warn('=============================== 发起请求 =======================================')
            console.log('请求接口：', 'http://localhost:3000/' + url)
            console.log('请求参数：', data)

            //发送请求
            let promise = new Promise((resolve, reject) => {
                axios.post(url, data)
                    .then(res => {
                        //相应数据打印
                        console.log('响应数据：', res.data)

                        //数据统一处理
                        if (res.data.code === 200) {
                            resolve(res.data.data)
                        } else {
                            this.$message.error(res.data.msg)
                            reject(res.data)
                        }
                        console.warn('=============================== 请求完成 =======================================')
                    })
            })
            return promise
        }
    }
}
