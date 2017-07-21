<template>
    <div id="index">
        <navbar :isSignin="isSignin" @signout="signout"></navbar>
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
            isSignin: false
        }
    },
    components: {
        articleCard,
        navbar
    },
    created() {
        // this.isSignin = this.getGlobalData('isSignin')
        // if (this.isSignin) { return }
        this.post({
            url: 'api/autoSignin',
            data: {
                rememberKey: this.getCookie('rememberKey')
            }
        }).then(res => {
            console.log('===========免登成功============')
            this.setGlobalData('isSignin', true)
            this.setGlobalData('userId', res)
            this.isSignin = true
        }).catch(err => {
            this.goPage('/sign', 'sign-in')
        })
    },
    mounted() {

    },
    methods: {
        signout(){
            this.isSignin = false
        }
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
