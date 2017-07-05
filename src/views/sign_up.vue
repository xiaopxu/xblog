<template>
    <div id="sign-up">
        <Row :gutter="16">
            <Col span="10">
            <div class="logo">

            </div>
            </Col>
            <Col span="14">
            <div class="forms">
                <Input v-model="userName" icon="person" placeholder="请输入用户名" style="margin:5px 0"></Input>
                <Input v-model="pwdword" icon="key" placeholder="请输入密码" style="margin:5px 0"></Input>
                <Button type="success" @click="signUp" long style="margin:5px 0">注册</Button>
            </div>
            </Col>
        </Row>
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
                return Promise.resolve(res)
            }).then(res => {
                console.log('注册ID：' + res)
            })
        }
    }
}
</script>
<style lang="less" scoped>
#sign-up {
    height: 100%;
    overflow: hidden;
    .logo {
        background: #ccc;
        padding: 10px;
        height: 500px;
    }
    .forms {
        background: #f4f4f4;
        padding: 10px;
        height: 500px;
    }
}
</style>


