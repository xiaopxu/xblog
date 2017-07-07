import moment from 'moment'
export default {
    install(Vue, options) {
        Vue.filter('moment', function (value, formatString) {
            formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
            return moment(value).format(formatString);
        });
    }
}
