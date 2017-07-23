<template>
    <div id="view">
        <div class="author">
            <tag value='作者'></tag>
            <span></span>
            <span class="edit" @click="goPage('/writer', $route.params.id)">编辑</span>
        </div>
        <div class="article">
            <h3 class="title">{{title}}</h3>
            <div class="content" v-html="view"></div>
        </div>
    </div>
</template>
<script>
import marked from 'marked'
import tag from './../../items/tag'
export default {
    data() {
        return {
            title: '',
            view: ''
        }
    },
    components: {
        tag
    },
    async mounted() {
        let viewData = await this.post({
            url: 'api/getArticleById',
            data: {
                _id: this.$route.params.id
            }
        })
        this.title = viewData.article.title
        this.view = marked(viewData.article.content)
    }
}
</script>
<style lang="less">
#view {
    .content {
        text-align: left;
        code {
            padding: 2px 4px;
            background-color: #f6f6f6;
            border: none;
            color: #657b83;
            font-size: 12px;
            white-space: pre-wrap;
        }
        pre {
            display: block;
            padding: 9.5px;
            margin: 0 0 10px;
            font-size: 13px;
            line-height: 20px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            word-wrap: normal;
            word-break: break-all;
            white-space: pre;
            overflow: auto;
            margin-bottom: 20px;
            border-radius: 0;
            background: #f6f6f6;
        }
        blockquote {
            border-left: solid 8px #f1f1f1;
            margin-left: 0;
            padding-left: 10px;
        }
    }
    .author {
        .edit {
            cursor: pointer
        }
    }
}
</style>


