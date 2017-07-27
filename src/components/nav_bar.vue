<template>
    <div id="nav-bar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div class="nav-left">
                <div class="logo" @click="goPage('/')">XBlog</div>
                <div class="home">
                    <el-menu-item index="index">
                        <router-link to="/">首页</router-link>
                    </el-menu-item>
                </div>
                <div class="search">
                    <el-input placeholder="搜索" icon="search" v-model="searchKey" :on-icon-click="doSearch"></el-input>
                </div>
            </div>

            <div class="nav-right">
                <el-submenu index="user">
                    <template slot="title">用户</template>
                    <el-menu-item index="setting">
                        <i class="fa fa-user"></i>&nbsp;&nbsp;我的主页
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <i class="fa fa-bookmark"></i>&nbsp;&nbsp;收藏的文章
                    </el-menu-item>
                    <el-menu-item index="setting">
                        <i class="fa fa-cog"></i>&nbsp;&nbsp;用户设置
                    </el-menu-item>
                    <el-menu-item index="signout" v-show="isSignin">
                        <i class="fa fa-sign-out"></i>&nbsp;&nbsp;注销
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="signin" v-show="!isSignin">登陆</el-menu-item>
                <el-menu-item index="signup" v-show="!isSignin">注册</el-menu-item>
                <el-menu-item index="writer">写作</el-menu-item>
            </div>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: 'index',
            searchKey: ''
        }
    },
    props: ['isSignin'],
    methods: {
        doSearch() {

        },
        async handleSelect(key, keyPath) {
            console.log(key)
            if (key === 'signout') {
                await this.post({
                    url: 'api/signout',
                    data: {
                        userId: this.getGlobalData('userId')
                    }
                })
                this.delCookie('rememberKey')
                this.setGlobalData('isSignin', false)
                this.$emit('update:isSignin', false)
            } else if (key === 'setting') {
                this.goPage('setting')
            } else if (key === 'signin') {
                this.goPage('/sign', 'sign-in')
            } else if (key === 'signup') {
                this.goPage('/sign', 'sign-up')
            } else if (key === 'writer') {
                let newArticle = await this.post({
                    url: 'api/addArticle',
                    data: {
                        userId: this.getGlobalData('userId')
                    }
                })
                if (newArticle) {
                    this.goPage('/writer', newArticle._id)
                }
            }
        },

    }
}
</script>
<style lang="less">
#nav-bar {
    .el-menu {
        .nav-right {
            float: right;
            text-align: left;
        }
        .nav-left {
            float: left;
            &>div {
                float: left;
            }
            .logo {
                font-size: 24px;
                line-height: 60px;
                color: skyblue;
                padding: 0 20px;
                cursor: pointer;
            }
            .search {
                height: 60px;
                padding: 0 20px;
                .el-input {
                    padding: 12px 0;
                }
            }
        }
    }
}
</style>


