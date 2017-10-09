<template>
    <div id="writer" @keydown.ctrl.83.prevent="saveArticle">
        <div class="editer">
            <div class="input" v-bind:class="{'full-screen': !showPreview}">
                <el-input v-model="title" placeholder="标题" class="title-input"></el-input>
                <div class="toolbar">
                    <i class="fa fa-repeat fa-lg" aria-hidden="true" v-show="isPublish"></i>
                    <i class="fa fa-share fa-lg" aria-hidden="true" v-show="!isPublish" @click="publishArticle"></i>
                    <i class="fa fa-floppy-o fa-lg" aria-hidden="true" @click="saveArticle"></i>
                    <i class="fa fa-lg" v-bind:class="{'fa-expand': showPreview, 'fa-compress': !showPreview}" aria-hidden="true" @click="togglePreview"></i>
                    <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
                    <i class="fa fa-home fa-lg" aria-hidden="true" @click="goPage('/')"></i>
                </div>
                <textarea id="input-area" v-model="rawHtml" @input="renderHtml" class="form-control" @scroll="scroll"></textarea>
            </div>
            <div class="preview" id="preview-area" v-show="showPreview">
                <div class="pre-title">{{title}}</div>
                <div class="pre-content" v-html="previewHtml"></div>
            </div>
        </div>
    </div>
</template>
<script>
import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
export default {
    data() {
        return {
            articleId: '',  //文章id
            rawHtml: '',  //编辑部分
            previewHtml: '',  //预览部分
            title: '',  //标题
            showPreview: true,  //是否预览
            isPublish: false  //是否已经发布
        }
    },
    components: {
        marked,
        highlightjs
    },
    methods: {
        renderHtml() {
            this.previewHtml = marked(this.rawHtml)
        },
        togglePreview() {
            this.showPreview = !this.showPreview
        },
        scroll() {
            // console.log('111111')
            let inputArea = document.querySelector('#input-area'),
                previewArea = document.querySelector('#preview-area'),
                previewContent = document.querySelector('#preview-area').querySelector('.pre-content')

            previewArea.scrollTop = inputArea.scrollTop / inputArea.offsetHeight * (previewArea.offsetHeight - 80)
        },
        async saveArticle(e) {
            let newArticle = await this.post({
                url: 'api/saveArticle',
                data: {
                    _id: this.articleId,
                    title: this.title,
                    content: this.rawHtml,
                }
            })
            if (newArticle) {
                this.$message({
                    message: '保存成功',
                    customClass: 'save-success',
                    iconClass: 'none'
                });
            }
        },
        async publishArticle() {
            let res = await this.post({
                url: 'api/publishArticle',
                data: {
                    _id: this.articleId
                }
            })
            if (res) {
                this.$message({
                    message: '发布成功',
                    type: 'success'
                })
            }
        }
    },
    created() {
        this.articleId = this.$route.params.id
    },
    async mounted() {
        if (this.articleId) {
            let newArticle = await this.post({
                url: 'api/getArticleById',
                data: {
                    _id: this.articleId
                }
            })
            if (newArticle) {
                this.rawHtml = newArticle.article.content
                this.title = newArticle.article.title
                this.previewHtml = marked(this.rawHtml)
            }
        }

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });

        let renderer = new marked.Renderer()
        renderer.table = function(header, body){
            return `<table class="pre-table">${header}${body}</table>`
        }

        $('.input textarea').css('height', $(window).height() - 157)
        $('.preview').css('height', $(window).height() - 60)
    }
}
</script>
<style lang="less">
html,
#app {
    max-width: none;
}

#writer {
    .input.full-screen {
        margin: 0 auto;
        float: none;
        box-shadow: 0 0 5px #ccc;
    }
    .input {
        float: left;
        width: 50%;
        height: 100%;
        .title-input input {
            border-radius: 0;
        }
        textarea {
            font-family: Georgia, "Times New Roman", Times, "Songti SC", serif;
            width: 95%;
            border: 0;
            border-radius: 0;
            resize: none;
            color: #2f2f2f;
            font-size: 18px;
            font-weight: normal;
            line-height: 30px;
            outline: none;
            padding: 0;
            padding-top: 20px;
            padding-left: 5%;
        }
        .toolbar {
            height: 40px;
            width: 100%;
            background: #dedede;
            i {
                display: block;
                float: right;
                padding-top: 12px;
                cursor: pointer;
                margin: 0 10px;
            }
            i:nth-lastchild {
                margin-right: 20px;
            }
        }
    }
    .preview {
        float: right;
        width: 50%;
        height: 100%;
        background-color: #fcfaf2;
        overflow-y: auto;
        text-align: left;
        .pre-title {
            width: 100%;
            height: 60px;
            font-size: 32px;
            line-height: 60px;
            text-align: center;
            padding: 10px 0;
        }
        .pre-content {
            width: 94%;
            padding: 0 3%;
        }
        // code {
        //     padding: 2px 4px;
        //     background-color: #f6f6f6;
        //     border: none;
        //     color: #657b83;
        //     font-size: 12px;
        //     white-space: pre-wrap;
        // }
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
        // blockquote {
        //     border-left: solid 8px #f1f1f1;
        //     margin-left: 0;
        //     padding-left: 10px;
        // }
        .pre-table{
            border-collapse: collapse;
            border: none;
            tr th, tr td{
                border:1px solid #ddd;
                padding: 0.5em;
                line-height: 1.6;
                vertical-align: middle;
            }
        }
        // ul{
        //     margin-bottom: 1.1em;
        // }
    }
}
</style>


