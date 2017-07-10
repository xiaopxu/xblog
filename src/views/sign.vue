<template>
    <div id="sign">
        <el-tabs v-model="signType">
            <el-tab-pane label="登陆" name="sign-in">
                <div class="forms">
                    <el-input placeholder="输入用户名" v-model="userName">
                        <template slot="prepend">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </template>
                    </el-input>
                    <el-input placeholder="输入密码" v-model="pwdword">
                        <template slot="prepend">
                            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                        </template>
                    </el-input>
                    <el-button type="success" @click="signIn">登陆</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="sign-up">
                <div class="forms">
                    <el-input placeholder="输入用户名" v-model="userName">
                        <template slot="prepend">
                            <i class="fa fa-user" aria-hidden="true"></i>
                        </template>
                    </el-input>
                    <el-input placeholder="输入密码" v-model="pwdword">
                        <template slot="prepend">
                            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                        </template>
                    </el-input>
                    <el-button type="success" @click="signUp">注册</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import md5 from 'md5'
export default {
    data() {
        return {
            signType: 'sign-in',
            userName: '',
            pwdword: ''
        }
    },
    mounted() {
        this.signType = this.$route.params.signType
    },
    methods: {
        signUp() {
            if (this.userName === '') {
                this.$message.error('用户名不能为空')
                return
            }
            if (this.pwdword === '') {
                this.$message.error('密码不能为空')
                return
            }
            this.post({
                url: 'api/signup',
                data: {
                    userName: this.userName,
                    pwdword: md5(this.pwdword)
                }
            }).then(res => {
                this.$message({
                    message: '恭喜，注册成功',
                    type: 'success'
                });
                console.log('注册ID：' + res)
                this.goPage('/')
            })
        },
        signIn() {
            if (this.userName === '') {
                this.$message.error('用户名不能为空')
                return
            }
            if (this.pwdword === '') {
                this.$message.error('密码不能为空')
                return
            }
            this.post({
                url: 'api/signin',
                data: {
                    userName: this.userName,
                    pwdword: md5(this.pwdword)
                }
            }).then(res => {
                this.$message({
                    message: '登陆成功',
                    type: 'success',
                });
                console.log('登陆ID：' + res)
                this.setCookie('userId', res)
                this.goPage('/')
            })
        }
    }
}
</script>
<style lang="less">
#sign {
    width: 400px;
    height: 100%;
    overflow: hidden;
    margin: 100px auto;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    .forms {
        background: #f4f4f4;
        padding: 10px;
        padding-top: 50px;
        height: 500px;
        .el-input {
            margin: 5px 0;
        }
    }
    .el-tabs__header {
        margin: 0;
    }
    .el-input-group__prepend {
        width: 20px;
    }
    .el-tabs__nav {
        width: 100%;
        .el-tabs__active-bar {
            left: 140px;
        }
    }
    button {
        width: 100%;
        margin: 5px 0;
    }
}
</style>


