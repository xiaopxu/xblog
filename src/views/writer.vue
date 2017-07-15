<template>
    <div id="writer">
        <div class="editer">
            <div class="input" v-bind:class="{'full-screen': !showPreview}">
                <el-input v-model="title" placeholder="标题" class="title-input"></el-input>
                <div class="toolbar">
                    <i class="fa fa-floppy-o fa-lg" aria-hidden="true" @click="saveArticle"></i>
                    <i class="fa fa-lg" v-bind:class="{'fa-expand': showPreview, 'fa-compress': !showPreview}" aria-hidden="true" @click="togglePreview"></i>
                    <i class="fa fa-refresh fa-lg" aria-hidden="true"></i>
                    <i class="fa fa-home fa-lg" aria-hidden="true" @click="goPage('/')"></i>
                </div>
                <textarea v-model="rawHtml" @input="renderHtml" class="form-control"></textarea>
            </div>
            <div class="preview" v-show="showPreview">
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
            rawHtml: '',
            previewHtml: '',
            title: '',
            showPreview: true
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
        saveArticle() {
            this.post({
                url: 'api/saveArticle',
                data: {
                    userId: '596049370b747e3a147eee64',
                    title: this.title,
                    content: this.rawHtml,
                }
            }).then(res => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            })
        }
    },
    mounted() {
        marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });
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


