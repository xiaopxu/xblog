<template>
    <div id="nav-bar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
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
                <el-menu-item index="user">
                    <router-link to="/">用户</router-link>
                </el-menu-item>
                <el-menu-item index="sign" v-show="!isSignin">
                    <router-link to="/sign/sign-in">登陆</router-link>
                </el-menu-item>
                <el-menu-item index="sign" v-show="!isSignin">
                    <router-link to="/sign/sign-up">注册</router-link>
                </el-menu-item>
                <el-menu-item index="writer">
                    <router-link to="/writer">写作</router-link>
                </el-menu-item>
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

        }
    }
}
</script>
<style lang="less">
#nav-bar {
    .el-menu {
        .nav-right {
            float: right;
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


