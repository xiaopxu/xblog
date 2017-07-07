<template>
    <div id="index">
        <div class="nav-bar">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="writer">
                    <router-link to="/writer">写作</router-link>
                </el-menu-item>
                <el-menu-item index="sign">
                    <router-link to="/sign">注册</router-link>
                </el-menu-item>
                <el-menu-item index="user">
                    <router-link to="/">用户</router-link>
                </el-menu-item>
                <el-menu-item index="index">
                    <router-link to="/">首页</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="lists">
            <articleCard :articleList="articleList"></articleCard>
        </div>
    </div>
</template>
<script>
import articleCard from './../components/article_card'
export default {
    data() {
        return {
            activeIndex: 'index',
            articleList: []
        }
    },
    components: {
        articleCard
    },
    mounted() {
        this.getArticle()
    },
    methods: {
        handleSelect() {

        },
        getArticle() {
            this.post({
                url: 'api/getAllArticle'
            }).then(res => {
                this.articleList = res
            })
        }
    }
}
</script>
<style lang='less'>
#index {
    .el-menu {
        &>li {
            float: right
        }
    }
}
</style>
