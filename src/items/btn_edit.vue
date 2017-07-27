<template>
    <div id="edit-btn">
        <span class="edit" @click="goPage('/writer', articleId)">{{text}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['text', 'articleId']
}
</script>
<style lang='less'>
#edit-btn {
    float: right;
    margin-top: 8px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #dcdcdc;
    color: #9b9b9b;
    line-height: 30px;
    border-radius: 50px;
}
</style>

