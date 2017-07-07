<template>
    <div id="article-card">
        <el-card class="box-card" v-for="article in articleList" :key="article">
            <div class="clearfix">
                <span style="line-height: 36px;">{{article.title}}</span>
            </div>
        </el-card>
    </div>
</template>
<script>
import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
export default {
    data() {
        return {
        }
    },
    props: ['articleList'],
    methods: {
        renderArticle(article) {
            return marked(article)
        }
    },
    mounted() {
        marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });
    },
    created() {

    }
}
</script>
<style lang="less>

</style>


