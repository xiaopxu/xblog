<template>
    <div id="index">
        <navbar></navbar>
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

        }
    },
    components: {
        articleCard,
        navbar
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
