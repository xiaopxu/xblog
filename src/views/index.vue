<template>
    <div id="index">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="index">首页</el-menu-item>
            <el-submenu index="user">
                <template slot="title">用户管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="sign">
                <router-link to="/sign">注册</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: 'index'
        }
    },
    methods: {
        handleSelect() {

        }
    }
}
</script>
<style lang='less' scoped>
#index {}
</style>
