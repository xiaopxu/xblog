//验证表达式
const userNameReg = /^[a-zA-Z]\w{5,17}$/
const mobileReg = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/
const passwordReg = /^[\\w]{6,12}$/
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/
const urlReg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/

//验证方法
export default {
    install(Vue, options) {
        /**
         * 字段验证
         * @param {any} field 验证字段
         * @param {string} title 字段名称
         * @return {boolean}
         */
        Vue.prototype.userNameTest = function (field, title) {
            if (!field || !title) {
                consoel.log('valifate方法调用错误')
                return
            }
            if (!userNameReg.test(field)) {
                this.$message.error('请输入正确的' + title)
                return false
            } else {
                return true
            }
        }

        Vue.prototype.passwordTest = function (field, title) {
            if (!field || !title) {
                consoel.log('valifate方法调用错误')
                return
            }
            if (!passwordReg.test(field)) {
                this.$message.error('请输入正确的' + title)
                return false
            } else {
                return true
            }
        }
    }
}
