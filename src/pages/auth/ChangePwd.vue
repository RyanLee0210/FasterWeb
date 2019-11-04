<template>

    <el-container class="login">
        <el-header>
            <el-row>
                <el-col
                    :span="4"
                    :offset="1"
                >
                    <div>

                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding: 0px">
            <el-row>
                <el-col :span="7">
                    <div class="bottom-left">
                        <img src="~@/assets/images/bottom-left.png">
                    </div>

                </el-col>
                <el-col :span="24">
                    <div>
                        <div id="form-title">FasterRunner</div>
                        <form id="submit-form">
                            <div id="form-content">
                                <div id="form-msg">用户：{{this.$store.state.user}}</div>
                                <div id="form-inputs">
                                    <div class="form-input-div">
                                        <i class="iconfont"
                                           style="position: absolute; bottom: 250px; padding-left: 10px">&#xe652;</i>
                                        <input placeholder="原密码" type="password" id="old_pwd" v-model="changepwdForm.old_password">
                                        <div class="err_msg" id="pwd_err" v-html="oldpasswordInvalid" @mouseover="oldpasswordInvalid= ''"></div>
                                    </div>
                                    <div class="form-input-div">
                                        <i class="iconfont"
                                           style="position: absolute; bottom: 190px; padding-left: 10px">&#xe652;</i>
                                        <input placeholder="新密码" type="password" id="new_pwd" v-model="changepwdForm.new_password">
                                        <div class="err_msg" id="pwd_err" v-html="newpasswordInvalid" @mouseover="newpasswordInvalid= ''"></div>
                                    </div>
                                    <div class="form-submit">
                                        <button type="button" class="btn btn-primary" id="submitBtn"
                                                @click="submitForm">提交修改
                                        </button>
                                    </div>
                                </div>
                                <div class="form-foot">
                                    <span>修改成功，<router-link to="/fastrunner/login">重新登陆</router-link></span>
                                </div>

                            </div>
                        </form>

                    </div>

                </el-col>
                <el-col :span="7">
                    <div class="bottom-right">
                        <img src="~@/assets/images/bottom-right.png">
                    </div>
                </el-col>
            </el-row>

        </el-main>
    </el-container>

</template>

<script>
    import encrypt from "@/utils/crypto.js";
    import decrypted from "@/utils/decode.js";

    export default {
        name: "Login",

        data() {
            return {
                changepwdForm: {
                    username:'',
                    old_password: '',
                    new_password: '',
                },
                oldpasswordInvalid: '',
                newpasswordInvalid: ''
            };
        },

        methods: {

            validateoldpassword() {
                if (this.changepwdForm.old_password.replace(/(^\s*)/g, "") === '') {
                    this.oldpasswordInvalid = "密码不能为空";
                    return false;
                }
                return true;
            },

            validatenewpassword() {
                const pPattern = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,20}$/;
                if (!pPattern.test(this.changepwdForm.new_password)) {
                    this.newpasswordInvalid = "新密码必须为8-20位字符串，且必须包含字母+数字+特殊字符";
                    return false
                }
                return true
            },
            handleChangeSuccess(resp) {
                if (resp.success) {
                    // 修改成功后暂时不跳转
                    this.$message.success(resp.msg)
                } else {
                    this.$message.error({
                        message: resp.msg,
                        duration: 2000,
                        center: true
                    })
                }
            },
            submitForm() {
                if (this.validateoldpassword() && this.validatenewpassword()) {
                    // 对登录请求的密码数据进行加密处理
                    this.changepwdForm.username = this.$store.state.user
                    let req = {
                        requestData:encrypt(JSON.stringify(this.changepwdForm))
                    }
                    this.$api.changepwd(req).then(resp => {
                        this.handleChangeSuccess(resp)
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
