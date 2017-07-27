<template>
    <div id="view">
        <div class="artical-info">
            <div class="info">
                <tag value='作者'></tag>
                <span>{{userName}}</span>
                </br>
                <span class="f12">{{lastEditDate | moment}}</span>
            </div>
            <editBtn text="编辑文章" :articleId="$route.params.id"></editBtn>
        </div>
        <div class="article">
            <h1 class="title">{{title}}</h1>
            <div class="content" v-html="view"></div>
        </div>
    </div>
</template>
<script>
import marked from 'marked'
import tag from './../../items/tag'
import editBtn from './../../items/btn_edit'
export default {
    data() {
        return {
            title: '',
            view: '',
            userName: '',
            lastEditDate: ''
        }
    },
    components: {
        tag, editBtn
    },
    async mounted() {
        let viewData = await this.post({
            url: 'api/getArticleById',
            data: {
                _id: this.$route.params.id
            }
        })
        this.title = viewData.article.title
        this.lastEditDate = viewData.article.createTime
        this.userName = viewData.user.userName
        this.view = marked(viewData.article.content)
    }
}
</script>
<style lang="less">
#view {
    max-width: 620px;
    margin: 0 auto;
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
    .artical-info {
        text-align: left;
        overflow: hidden;
        margin: 30px 0 40px;
        .info {
            float: left;
        }
        .edit {
            cursor: pointer
        }
        #tag {
            margin: 5px 0;
            margin-right: 5px;
        }
    }
}
</style>


