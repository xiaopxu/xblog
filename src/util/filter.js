import moment from 'moment'
export default {
    install(Vue, options) {
        /**
         * 日期格式化
         * 
         * @param {date} value 时间
         * @param {string} formatString 格式（默认'YYYY-MM-DD HH:mm:ss'）
         * @return {string}
         */
        Vue.filter('moment', function (value, formatString = 'YYYY-MM-DD HH:mm:ss') {
            return moment(value).format(formatString);
        });
    }
}
