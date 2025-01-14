<template>
    <!--用户名密码进行登录后台-->
    <el-row style="width: 100%">
        <el-form ref="form" :model="form" label-width="80px" class="background">

            <div class="login-title">登录页面</div>

            <!-- 选择登录角色 -->
            <el-form-item label="登录角色:" class="labellogin">
                <el-select v-model="form.role" placeholder="请选择角色">
                    <el-option label="老师" value="teacher"></el-option>
                    <el-option label="学生" value="student"></el-option>
                    <el-option label="教务处" value="admin"></el-option>
                    <el-option label="家长" value="parent"></el-option>
                </el-select>
            </el-form-item>
            <!-- 输入用户名栏 -->
            <el-form-item label="电子邮箱:" class="labellogin">
                <el-input v-model="form.email" class="inputlogin" placeholder="请输入电子邮箱">
                </el-input>
            </el-form-item>
            <!-- 输入登录密码栏 -->
            <el-form-item label="登录密码:" class="labellogin" style="color: skyblue">
                <el-input v-model="form.password" class="inputlogin" style="background-color: #fff" show-password
                    placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item style="text-align: center">
                <!-- 登录按钮 -->
                <el-button @click="submitLogin()" style="
            width: 120px;
            height: 40px;
            font-size: 16px;
            margin-left: -80px;
            background-color: #38c3a1;
            color: #fff;
          ">登录
                </el-button>

                <!-- 注册按钮 -->
                <el-button @click="registerDialog" style="
            width: 120px;
            height: 40px;
            font-size: 16px;
            margin-left: 20px;
            background-color: #38c3a1;
            color: #fff;
          ">注册
                </el-button>

            </el-form-item>
            <p style="margin-top: 100px; font-size: 12px; color: #999">
                数字助教平台
            </p>
        </el-form>
        <p style="margin-top: 100px; font-size: 12px; color: #666">
            Copyright © 2020 至今 上海高瞩科技有限公司
        </p>

        <el-dialog title="用户注册" :visible.sync="signVisible" :modal="false" width="80%" height="460" top="0vh
      " style="top: 8vh; height: 570px">
            <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="100px">
                <!-- 输入用户名 -->
                <el-form-item label="电子邮箱：" prop="NumberId">
                    <el-input v-model="addForm.NumberId" id="NumberId" placeholder="请输入工号"
                        style="width: 420px"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="Realname">
                    <el-input v-model="addForm.Realname" id="Realname" placeholder="请输入姓名"
                        style="width: 420px"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="Passwords">
                    <el-input v-model="addForm.Passwords" id="Passwords" placeholder="请输入密码" show-password
                        style="width: 420px" type="password"></el-input>
                </el-form-item>
                <!-- 确认密码 -->
                <el-form-item label="确认密码：" prop="ConfirmPassword">
                    <el-input v-model="addForm.ConfirmPassword" id="ConfirmPassword" placeholder="请再次输入密码" show-password
                        style="width: 420px" type="password"></el-input>
                </el-form-item>
                <br /><br />
                <div style="text-align: center">
                    <span slot="footer" class="dialog-footer">
                        <!-- 取消按钮 -->
                        <el-button type="info" @click="signVisible = false">取 消</el-button>
                        <!-- 确认注册按钮 -->
                        <el-button type="primary" @click="submitRegister('addForm')">注 册</el-button>
                    </span>
                </div>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    // name: "ToLogin ",
    components: {},
    data() {
        return {
            signVisible: false,
            addForm: {
                Realname: "",
                Passwords: "",
                ConfirmPassword: "",
                NumberId: "",

            },
            form: {
                email: "",
                password: "",
                role: "teacher",
            },
            //校验
            rules: {
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                email: [
                    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的电子邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    mounted: function () {
        console.log(localStorage.getItem("login"));
    },
    methods: {
        //注册提交
        submitRegister(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("success")
                    this.request.post("/yyc/i-teachers/TeacherRegister", JSON.stringify(this.addForm)).then(res => {
                        console.log(res)
                        if (res.status == "注册成功") {
                            this.form = {
                                NumberId: this.addForm.NumberId,
                                Passwords: this.addForm.Passwords
                            },
                                this.addForm = {
                                    Realname: "",
                                    Passwords: "",
                                    ConfirmPassword: "",
                                    NumberId: ""
                                };
                            this.signVisible = false;

                            this.$message({
                                message: "恭喜你，注册成功",
                                type: "success",
                            });

                        } else {
                            this.$message({
                                message: "该工号已经存在，注册失败",
                                type: "error",
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: "请正确填写注册内容",
                        type: "error",
                    });
                }

            });
        },

        //注册
        registerDialog() {
            this.addForm = {
                NumberId: "",
                Realname: "",
                Passwords: "",
                ConfirmPassword: "",
            };
            this.signVisible = true;

        },

        //登录提交表单
        ...mapMutations(['setUserRole']),
        submitLogin() {
            if (!this.form.email) {
                this.$message.error('请输入电子邮箱');
                return;
            }
            if (!this.form.password) {
                this.$message.error('请输入密码');
                return;
            }
            if (!this.form.role) {
                this.$message.error('请选择角色');
                return;
            }
            this.request.post("/login", JSON.stringify(this.form)).then(res => {
                if(res.data){
                    localStorage.setItem("login", true)
                    localStorage.setItem("userinfo", JSON.stringify(res.data))
                    this.$router.push("/");
                }else{
                    this.$message.error('登录失败,请检查登陆角色、用户名和密码');
                }

            })

        },
    },
};
</script>

<style scoped>
.background {
    background-color: rgba(255, 255, 255, 1) !important;
    padding: 50px;
    /* padding-top: 200px; */
    margin-top: -100px;
    width: 360px;
    height: 300px;
    border-radius: 15px;
    color: black;
}

.el-row {
    width: 100%;
}

.el-form-item {
    margin-bottom: 40px;
}

.labellogin {
    width: 100%;
    text-align: center;
}

.inputlogin {
    width: 200px;
}

.el-form-item__label {
    width: 60px !important;
    /* font-size: 16px !important; */
}

.login-title {
    margin-top: 20px;
    position: relative;
    top: -30px;
    font-size: 24px;
}

#addForm {
    z-index: 9999 !important;
}

.el-form-item__content {
    margin-left: 110px !important;
}

.el-form-item__label {
    width: 104px;
}

.el-dialog__wrapper {
    left: -150px;
    width: 800px !important;
    height: 900px !important;
    top: 15px !important;
}

.el-dialog {
    height: 800px !important;
}
</style>
