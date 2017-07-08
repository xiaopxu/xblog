<template>
    <div id="article-list">
        <articleCard :articleList="articleList"></articleCard>
    </div>
</template>
<script>
import articleCard from './../../components/article_card'
export default {
    data() {
        return {
            articleList: []
        }
    },
    components: {
        articleCard
    },
    methods: {
        getArticle() {
            this.post({
                url: 'api/getAllArticle'
            }).then(res => {
                this.articleList = res
            })
        }
    },
    mounted() {
        this.getArticle()
    }
}
</script>
<style lang="less">

</style>


