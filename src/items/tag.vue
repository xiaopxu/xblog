<template>
    <div id="tag">
        <span class="tag">{{value}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['value', 'color']
}
</script>
<style lang="less" scoped>
#tag {
    display: inline-block;
    width: 30px;
    height: 18px;
    padding: 1px 2px;
    font-size: 12px;
    color: #ea6f5a;
    border: 1px solid #ea6f5a;
    border-radius: 3px;
    text-align: center;
}
</style>
