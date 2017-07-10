export default {
    install(Vue, options) {
        /**
         * 设置cookie
         *
         * @param {string} name key
         * @param {string} value value
         */
        Vue.prototype.setCookie = function (name, value) {
            var Days = 10; //此 cookie 将被保存 30 天
            var exp = new Date(); //new Date("December 31, 9998");
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            if ((typeof value == "string") && (value.length > 0)) {
                document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            } else {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }

        /**
         * 获取cookie
         *
         * @param {string} name key
         */
        Vue.prototype.getCookie = function (name) {
            // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) {
                return unescape(arr[2]);
            }
            return null;
        }
    }
}
