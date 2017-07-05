<template>
    <div id="sign-up">
        <Input v-model="userName" icon="person" placeholder="请输入用户名"></Input>
        <Input v-model="pwdword" icon="key" placeholder="请输入密码"></Input>
        <Button type="success" @click="signUp">注册</Button>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            userName: '',
            pwdword: ''
        }
    },
    mounted() {

    },
    methods: {
        signUp() {
            if (this.userName === '') {
                this.$Message.error('用户名不能为空')
                return
            }
            if (this.pwdword === '') {
                this.$Message.error('密码不能为空')
                return
            }
            this.post({
                url: 'api/signup',
                data: {
                    userName: this.userName,
                    pwdword: this.pwdword
                }
            }).then(res => {
                this.$Notice.open({
                    title: '注册成功'
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>


