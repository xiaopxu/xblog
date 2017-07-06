<template>
    <div id="index">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="sign">
                <router-link to="/sign">注册</router-link>
            </el-menu-item>
            <el-menu-item index="user">
                <router-link to="/">用户</router-link>
            </el-menu-item>
            <el-menu-item index="index">首页</el-menu-item>
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
    created() {

    },
    methods: {
        handleSelect() {

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
