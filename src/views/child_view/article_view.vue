<template>
    <div id="view">
        <h3 class="title">{{title}}</h3>
        <div class="content" v-html="view"></div>
    </div>
</template>
<script>
import marked from 'marked'
export default {
    data() {
        return {
            title: '',
            view: ''
        }
    },
    mounted() {
        this.post({
            url: 'api/getArticleById',
            data: {
                _id: this.$route.params.id
            }
        }).then(res => {
            this.title = res.title
            this.view = marked(res.content)
        })
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
}
</style>


