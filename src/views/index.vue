<template>
    <div id="index">
        <navbar :isSignin.sync="isSignin" :userName="userName"></navbar>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import articleCard from './../components/article_card'
import navbar from './../components/nav_bar'
export default {
    data() {
        return {
            isSignin: false,
            userName: ''
        }
    },
    components: {
        articleCard,
        navbar
    },
    async created() {
        this.isSignin = this.getGlobalData('isSignin')
        if (this.isSignin) { return }

        try {
            let user = await this.post({
                url: 'api/autoSignin',
                data: {
                    rememberKey: this.getCookie('rememberKey')
                }
            })
            console.log('===========免登成功============')
            this.setGlobalData('isSignin', true)
            this.setGlobalData('userId', user._id)
            this.isSignin = true
            this.userName = user.userName
        } catch (err) {
            // this.goPage('/sign', 'sign-in')
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
<style lang='less'>
#index {
    .content {
        max-width: 1080px;
        margin: 0 auto;
    }
}
</style>
