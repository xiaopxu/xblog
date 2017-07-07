<template>
    <div id="article-card">
        <el-card class="box-card" v-for="article in articleList" :key="article">
            <div class="info">
                <span class="author"></span>
                <span class="time">{{article.createTime | moment}}</span>
            </div>
            <div class="article-title clearfix">
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
<style lang="less">
#article-card {
    text-align: left;
    padding: 5px 10px;
    .info {
        .time {
            font-size: 12px;
        }
    }
    .article-title {}
}
</style>


