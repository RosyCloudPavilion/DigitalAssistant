<!--  -->
<template>
    <div id="nav">
        <el-container>
            <el-header>
                <div class="logo-text">
                    <span>高瞩科技 &emsp;<span>|</span>&ensp; &nbsp; 数字助教</span>
                </div>
                <div class="welcome-text">
                    <span v-if="userinfo.role == 'teacher'">您好，老师</span>
                    <span v-if="userinfo.role == 'student'">您好，学生</span>
                    <span v-if="userinfo.role == 'parent'">您好，家长</span>
                    <span v-if="userinfo.role == 'admin'">您好，教务处管理员</span>
                </div>
                <el-dropdown @command="logindown">
                    <span class="el-dropdown-link">

                        <div class="block">
                            <el-avatar style="margin-top: 10px" :size="40"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </div>
                    </span>
                    <el-dropdown-menu slot="dropdown" placement="top - start">
                        <!-- <el-dropdown-item command="message" icon="el-icon-plus">消息</el-dropdown-item>
                        <el-dropdown-item command="toDoList" icon="el-icon-circle-plus">待办</el-dropdown-item>
                        <router-link to="/informationManagement/createClass" style="text-decoration: none">
                            <el-dropdown-item command="createClass"
                                icon="el-icon-circle-plus-outline">开课</el-dropdown-item>
                        </router-link> -->
                        <el-dropdown-item command="setting" icon="el-icon-circle-plus-outline">设置</el-dropdown-item>

                        <el-dropdown-item command="quit" icon="el-icon-circle-check">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>

            <div id="setting" class="setnone">
                <!-- <h3>退出</h3> -->
                <el-page-header @back="goBack" content="设置" style="padding: 40px; margin-top: -20px">
                </el-page-header>
                <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left: 40px">
                    <el-tab-pane label="基本信息" name="first">
                        <a href="javascript:;" class="a-upload1">
                            <span>修改头像</span>
                            <input type="file" accept="image/*" name="" id="file1" @change="inputimg" />
                        </a>
                        <br />
                        <br />
                        <br />
                        <br />

                        <table>
                            <thead>
                                <tr>
                                    <th>个人资料</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>姓名</td>
                                    <td>
                                        <span v-if="notset">{{ userinfo.realname }}</span>
                                        <input v-if="!notset" v-model="userinfo.realname" type="text"
                                            placeholder="姓名" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>性别</td>
                                    <td>
                                        <span v-if="notset">{{ userinfo.state }}</span>
                                        <select v-if="!notset" name="" id="" v-model="userinfo.state">
                                            <option value="男">男</option>
                                            <option value="女">女</option>
                                            <option value="其他">其他</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>生日</td>
                                    <td>
                                        <span v-if="notset">{{ userinfo.birthday }}</span>

                                        <el-date-picker v-if="!notset" v-model="birthday" type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </td>
                                </tr>
                                <tr>
                                    <td>工号</td>
                                    <td>
                                        <span>{{ userinfo.numberId }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>号码</td>
                                    <td>
                                        <span v-if="notset">{{ userinfo.phone }}</span>
                                        <input v-if="!notset" v-model="userinfo.phone" type="text" placeholder="号码" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>邮箱</td>
                                    <td>
                                        <span v-if="notset">{{ userinfo.email }}</span>
                                        <input v-if="!notset" v-model="userinfo.email" type="text" placeholder="邮箱" />
                                        <span>{{ userinfo.school }}</span>
                                    </td>
                                </tr>
                                <!-- <tr>
                                <td>所属院系</td>
                                <td>
                                    <span v-if="notset">{{ userinfo.department }}</span>
                                    <input v-if="!notset" v-model="userinfo.department" type="text" placeholder="所属院系" />
                                </td>
                            </tr> -->
                                <tr>
                                    <td></td>
                                    <td>
                                        <span v-if="notset">
                                            <el-button plain size="medium" @click="notset = false">编辑</el-button>
                                        </span>
                                        <span v-if="!notset">
                                            <el-button plain size="medium" @click="submitAlter">确定</el-button>
                                            <el-button plain size="medium" @click="notset = true">取消</el-button>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </el-tab-pane>
                    <el-tab-pane label="账号安全" name="second">
                        <el-form style="width: 50%; margin-top: 40px">
                            <el-form-item label="旧密码">
                                <el-input type="password" v-model="alter.Passwords" :show-password="true"
                                    placeholder="请输入当前密码"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input type="password" placeholder="请输入6-20位数字、字母、下划线" v-model="alter.NewPasswords"
                                    :show-password="true"></el-input>
                            </el-form-item>
                            <el-form-item label="再次输入新密码">
                                <el-input type="password" :show-password="true" placeholder="再次输入新密码"
                                    v-model="alter.qrNewPasswords"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="submitAlterPassword">确认</el-button>
                                <el-button @click="submitnot">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="帮助中心" name="third">帮助中心</el-tab-pane>
                    <!-- <el-tab-pane label="定时任务补偿" name="fourth" -->
                    <!-- >定时任务补偿</el-tab-pane
          > -->
                </el-tabs>
            </div>

            <el-container>
                <el-aside width="150px">

                    <!-- 老师账户 -->
                    <template v-if="userinfo.role == 'teacher'">
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                            @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-s-grid"></i>
                                    <span>班级视图</span>
                                </template>
                                <el-menu-item-group>
                                    <router-link to="/experimentalPerformance" style="text-decoration: none">
                                        <el-menu-item index="1-1" class="lists"
                                            style="text-decoration: none; padding-left: 60px">班级整体表现</el-menu-item>
                                    </router-link>
                                    <router-link to="/home" style="text-decoration: none">
                                        <el-menu-item index="1-2" class="lists"
                                            style="text-decoration: none; padding-left: 60px">班级摄像头</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>

                        <!-- 
                        <router-link to="/experimentalPerformance" style="text-decoration: none">
                            <div class="lists list1">
                                <i class="el-icon-s-grid"></i>
                                班级视图
                            </div>
                        </router-link>
                        <router-link to="/home" style="text-decoration: none">
                            <div class="lists list1">
                                <i class="el-icon-s-grid"></i>
                                班级视图
                            </div>
                        </router-link> -->
                        <!-- <router-link to="/groupView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-platform"></i>
                                小组视图
                            </div>
                        </router-link> -->
                        <router-link to="/studentView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-custom"></i>
                                学生视图
                            </div>
                        </router-link>
                        <router-link to="/psychologicalView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-aim"></i>
                                心理视图
                            </div>
                        </router-link>

                        <!-- <router-link to="/experimentalPerformance" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-medal"></i>
                                实验整体表现
                            </div>
                        </router-link> -->


                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                            @close="handleClose" :default-openeds="['1']">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-s-unfold"></i>
                                    <span>信息管理</span>
                                </template>
                                <el-menu-item-group>
                                    <router-link to="/informationManagement/classInfo" style="text-decoration: none">
                                        <el-menu-item index="1-1" class="lists"
                                            style="text-decoration: none; padding-left: 60px">班级信息管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/informationManagement/studentInfo" style="text-decoration: none">
                                        <el-menu-item index="1-2" class="lists"
                                            style="text-decoration: none; padding-left: 60px">学生信息管理</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                        
                        <router-link to="/updateInfo" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-unfold"></i>
                                个人信息管理
                            </div>
                        </router-link>
                    </template>

                    <!-- 学生账户 -->
                    <template v-if="userinfo.role == 'student'">
                        <router-link to="/studentView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-custom"></i>
                                学生视图
                            </div>
                        </router-link>
                        <router-link to="/psychologicalView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-aim"></i>
                                心理视图
                            </div>
                        </router-link>
                        <router-link to="/updateInfo" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-unfold"></i>
                                信息/照片管理
                            </div>
                        </router-link>
                        <router-link to="/answeringQuestion" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-service"></i>
                                互动答疑
                            </div>
                        </router-link>
                    </template>


                    <!-- 家长账户 -->
                    <template v-if="userinfo.role == 'parent'">
                        <router-link to="/studentView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-custom"></i>
                                学生视图
                            </div>
                        </router-link>
                        <router-link to="/psychologicalView" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-aim"></i>
                                心理视图
                            </div>
                        </router-link>
                        <router-link to="/updateInfo" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-unfold"></i>
                                个人信息管理
                            </div>
                        </router-link>
                    </template>

                    <!-- 教务处账户 -->
                    <template v-if="userinfo.role == 'admin'">
                        <router-link to="/updateInfo" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-s-unfold"></i>
                                个人信息管理
                            </div>
                        </router-link>


                        <router-link to="/teachingQuality" style="text-decoration: none">
                            <div class="lists">
                                <i class="el-icon-tickets"></i>
                                课程教学质量
                            </div>
                        </router-link>

                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                            @close="handleClose" :default-openeds="['1']">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-s-unfold"></i>
                                    <span>信息管理</span>
                                </template>
                                <el-menu-item-group>
                                    <router-link to="/informationManagement/classInfo" style="text-decoration: none">
                                        <el-menu-item index="1-1" class="lists"
                                            style="text-decoration: none; padding-left: 60px">班级信息管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/informationManagement/studentInfo" style="text-decoration: none">
                                        <el-menu-item index="1-2" class="lists"
                                            style="text-decoration: none; padding-left: 60px">学生信息管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/informationManagement/teacherInfo" style="text-decoration: none">
                                        <el-menu-item index="1-3" class="lists"
                                            style="text-decoration: none; padding-left: 60px">教师信息管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/informationManagement/parentInfo" style="text-decoration: none">
                                        <el-menu-item index="1-4" class="lists"
                                            style="text-decoration: none; padding-left: 60px">家长信息管理</el-menu-item>
                                    </router-link>
                                    <router-link to="/informationManagement/cameraInfo" style="text-decoration: none">
                                        <el-menu-item index="1-5" class="lists"
                                            style="text-decoration: none; padding-left: 60px">摄像头信息管理</el-menu-item>
                                    </router-link>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </template>
                    <!-- <router-link to="/test" style="text-decoration: none">
                    <div class="lists">
                        <i class="el-icon-service"></i>
                        Test
                    </div>
                </router-link> -->

                </el-aside>
                <el-main id="el-mainonly" class="el-main1">
                    <el-scrollbar style="height: 100%">
                        <keep-alive>
                            <router-view />
                        </keep-alive>
                    </el-scrollbar>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
import {
    color
} from "echarts";

export default {
    name: "Home",
    data() {
        return {
            birthday: "",
            activeName: "first",
            notset: true,
            login: localStorage.getItem("login"),
            userinfo: JSON.parse(localStorage.getItem("userinfo")),
            alter: {
                Passwords: "",
                NewPasswords: "",
                qrNewPasswords: ""
            }
        }
    },
    mounted() {
        if (!this.login) {
            this.$router.push("/login/gologin");
        } else {
            console.log(this.userinfo);
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        logindown(command) {
            if (command == "quit") {
                localStorage.removeItem("login")
                localStorage.removeItem("userinfo")
                this.$router.push("/login/gologin")
            } else if (command == "setting") {
                $("#setting").removeClass("setnone");
                $("#setting").addClass("setblock");
            } else if (command == "createClass") {
                this.goBack();

            }

        },
        goBack() {
            $("#setting").addClass("setnone");
            $("#setting").removeClass("setblock");
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        inputimg(e, filelist) {

        },
        submitAlter() {
            this.userinfo.birthday = this.birthday
            console.log(this.userinfo)
            var uploadForm = {
                ID: this.userinfo.id,
                ExpeId: this.userinfo.expeId,
                ClassId: this.userinfo.classId,
                NumberId: this.userinfo.numberId,
                Realname: this.userinfo.realname,
                Passwords: this.userinfo.passwords,
                State: this.userinfo.state,
                ImagUrl: this.userinfo.imagUrl,
                Phone: this.userinfo.phone,
                Email: this.userinfo.email,
            }
            console.log(uploadForm)
            this.request.post("/yyc/i-teachers/TeacherUpdate", JSON.stringify(uploadForm)).then(res => {
                console.log(res)
                if (res.status == 200) {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    this.notset = true
                }

            })
        },
        submitnot() { },
        submitAlterPassword() {
            var uploadForm = {
                ID: this.userinfo.id,
                ExpeId: this.userinfo.expeId,
                ClassId: this.userinfo.classId,
                NumberId: this.userinfo.numberId,
                Realname: this.userinfo.realname,
                State: this.userinfo.state,
                ImagUrl: this.userinfo.imagUrl,
                Phone: this.userinfo.phone,
                Email: this.userinfo.email,
                Passwords: this.alter.Passwords,
                NewPasswords: this.alter.NewPasswords,
                qrNewPasswords: this.alter.qrNewPasswords
            }
            console.log(this.alter)
            if (this.alter.qrNewPasswords == this.alter.NewPasswords) {
                this.request.post("/yyc/i-teachers/TeacherUpdate", JSON.stringify(uploadForm)).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.$message({
                            message: "修改成功, 请重新登录",
                            type: "success",
                        });
                        localStorage.removeItem("login")
                        localStorage.removeItem("userinfo")
                        this.$router.push("/login/gologin")

                    } else {
                        this.$message({
                            message: "原密码错误，请重新输入",
                            type: "error",
                        });
                    }
                })
            } else {
                this.$message({
                    message: "两次密码输入不同，请重新输入",
                    type: "error",
                });
            }
        }
    }
}
</script>

<style>
.el-submenu__title span {
    line-height: 22px !important;
    font-weight: 700 !important;
    font-size: 16px;
}

.el-upload--picture-card {
    background-color: #fbfdff;
    border: solid #fff dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    line-height: 80px;
    vertical-align: top;
    width: 80px !important;
    height: 80px !important;
}

.el-menu-item-group__title {
    padding: 0;
}

.el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: solid #fff solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    margin: 0 8px 8px 0;
    display: inline-block;
}

.el-scrollbar__wrap {
    right: 100px;
    overflow-x: hidden !important;
    /* overflow-y: hidden !important; */
}

.el-message--warning {
    top: 140px !important;
    /* margin-top: 500px !important; */
}

.el-message--error {
    top: 120px !important;
    /* margin-top: 500px !important; */
}

.el-select1 {
    width: 130px;
    z-index: 999 !important;
}

.el-select2 {
    width: 130px;
    z-index: 999 !important;
}

.el-select3 {
    width: 120px;
    z-index: 999 !important;
}

.showmain {
    border: 0px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) !important;
}

.showmain2 {
    border: 0px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1) !important;
}

.searchnav {
    position: fixed;
    top: 80px;
    z-index: 2000;
    margin-left: -12px;
    width: 976px;
    height: 63px;
    padding-top: -5px !important;
    border-radius: 10px !important;
}

.searchnav2 {
    position: fixed;
    top: 80px;
    z-index: 2001;
    margin-left: -12px;
    width: 970px;
    height: 120px;
    padding-top: -10px !important;
}

.el-row {
    /* margin-b: -10px; */
    margin-bottom: 0;
}

.el-row1 {
    overflow: none;
    width: 775px;
    margin-left: -60px;
    margin-top: -10px;
}

.el-scrollbar__view {
    padding-bottom: 25px;
}

.el-rowshow {
    /* padding-bottom: 60px !important; */
    border-bottom: 2px solid #ccc;
    height: 325px;
}

.el-rowshow3 {
    /* padding-bottom: 60px !important; */
    margin-top: 30px;
    border-bottom: 2px solid #ccc;
    height: 180px;
}

.el-rowshow1 {
    /* padding-bottom: 60px !important; */
    border-bottom: 2px solid #ccc;
    height: 450px;
}

.el-form-item__label {
    padding-right: 0px !important;
}

.el-submenu__title {
    /* left: -21px; */
    padding-right: 50px !important;
}

.el-submenu__title:hover {
    color: #3eb296 !important;
    background: #e2f7f4 !important;
    /* border-bottom: 1px solid #3eb296 !important; */
}

.el-submenu__title:hover .el-icon-s-unfold {
    color: #3eb296 !important;
    /* background: #e2f7f4 !important; */
    /* border-bottom: 1px solid #3eb296 !important; */
}

/* .el-menu-item.is-active {
    color: #3eb296 !important ;
  } */
.lists {
    /* height: 80px; */
    color: #000000;
    padding: 16px;
    line-height: 22px !important;
    vertical-align: middle;
    transition: all 0.5s;
    text-align: left;
    padding-left: 50px;
    border-bottom: 1px solid #fff;
    /* border-bottom: 2px solid #eee; */
    transition: all 0.2s;
}

.lists:hover {
    color: #3eb296 !important;
    background: #e2f7f4 !important;
    /* border-bottom: 1px solid #3eb296 !important; */
}
</style>
<style scoped>
body {
    width: 1920px;

    padding: 0;
    margin: 0 auto;
    background-color: #f2f2f2 !important;
}

#nav {
    margin: auto;
}

.el-aside {
    /* background-color: rgb(198, 235, 252) !important; */
    /* height: 600px; */
    position: fixed;
    /* margin-left: 20px; */
    margin-top: 80px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%) !important;
    border-radius: 10px;
    z-index: 999;
    width: 220px !important;
    background-color: #fff !important;
    /* background-image: linear-gradient(
      to bottom,
      rgb(193, 255, 255),
      rgb(248, 242, 160),
      rgb(193, 255, 255)
    ); */
}

.el-main {
    /* width: 100px !important; */
    height: 765px;
    margin-top: 160px;
    margin-left: 255px;
    background-color: #fff !important;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%) !important;
}

.el-menu {
    border-right: 0px;
}

.el-header {
    /* background-color: skyblue !important; */
    /* width: 1920px; */
    width: 100%;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    background-color: #38c3a1;
    /* background-image: linear-gradient(
      to right,
      rgb(255, 255, 255),
      skyblue,
      rgb(193, 255, 255)
    ); */
    box-shadow: 0px 5px 5px #ccc !important;
    /* z-index: 99; */
    position: fixed;
    top: 0;
    left: 0;
}

.logo {
    width: 150px;
    height: 100px;
    overflow: hidden;
}

.logo-text {
    height: 60px;
    /* width: 400px; */
    z-index: -10;
    display: inline;
    overflow: hidden;
}

.welcome-text {
    line-height: 60px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: #fff;
    text-shadow: 5px 5px 5px #000;
}

.logo-text>span {
    line-height: 60px;
    position: absolute;
    top: 0;
    /* left: 200px; */
    font-size: 24px;
    color: #fff;
    text-shadow: 5px 5px 5px #000;
    /* font-family: "楷体"; */
}

.logo-text>img {
    margin-top: 10px !important;
    height: 40px !important;
}

.el-menu--popup,
.el-menu--popup-bottom-start {
    min-width: 60px !important;
    width: 100px;
}

.lists {
    /* height: 80px; */
    padding: 16px;
    line-height: 22px !important;
    vertical-align: middle;
    transition: all 0.5s;
    text-align: left;
    padding-left: 50px;
    border-bottom: 1px solid #fff;
    /* border-bottom: 2px solid #eee; */
    transition: all 0.2s;
}

.lists:hover {
    color: #3eb296 !important;
    background: #e2f7f4 !important;
    /* border-bottom: 1px solid #3eb296 !important; */
}

.list1 {
    margin-top: 0px;
}

.login-text {
    line-height: 60px;
    width: 100px;
    color: #fff;
    left: 0px;
    text-decoration: none !important;
    text-decoration-line: none;
    background-color: #38c3a1 !important;
    border: 0px !important;
}

.login-text1 {
    position: absolute;
    height: 60px;
    width: 100px;
    color: #fff;
    /* top: -5px */
    right: 20px;
    margin: 0px;
    text-decoration: none !important;
    text-decoration-line: none;
    background-color: #38c3a1 !important;
    border: 0px !important;
}

.login-text:hover {
    background-color: #38c3a1 !important;
}

.el-icon-s-custom,
.el-icon-s-platform,
.el-icon-s-grid,
.el-icon-tickets,
.el-icon-aim,
.el-icon-medal,
.el-icon-s-unfold,
.el-icon-service,
.el-icon-s-marketing,
.el-icon-edit .el-icon-location {
    font-size: 30px !important;
    /* line-height: 100px !important; */
    position: relative;
    left: -10px;
    top: 5px;
    /* margin-top: 5px; */
}

.el-icon-s-unfold,
.el-icon-s-grid {
    color: #333;
    top: 0;
}

.el-header,
.el-footer {
    /* background-color: #b3c0d1; */
    color: #333;
    text-align: center;
    /* line-height: 60px; */
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    /* line-height: 200px; */
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
}

body>.el-container {
    margin-bottom: 40px;
}

.el-submenu .el-submenu__title {
    height: 65px !important;
}

.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border: 0px !important;
}

#setting {
    position: absolute;
    top: 80px;
    width: 100%;
    background-color: #fff;
    z-index: 2001;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%) !important;
    border-radius: 10px;
    background-image: url("../assets/shebgc.png");
    background-size: 100% 100%;
    height: 90vh;
    /* display: none; */
}

.el-menu-item {
    font-weight: 700;
}

#setting h3 {
    text-align: left;
    margin-left: 20px;
}

.setnone {
    display: none;
    height: max-content;
}

.setblock {
    display: block;
}

.a-upload1 {
    background-repeat: no-repeat;
    background-size: 80px 80px;
    width: 80px !important;
    height: 80px !important;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    /* *display: inline; */
    /* *zoom: 1; */
}

.a-upload1 input {
    /* background-image: url("../../assets/login.png"); */
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    /* filter: alpha(opacity=0); */
    cursor: pointer;
}

.a-upload1:hover {
    text-decoration: none;
    opacity: 0.4;
}

.a-upload1 span {
    color: #333;
    position: absolute;
    top: 33px;
    left: 10px;
    display: none;
}

.a-upload1:hover span {
    display: block;
}

table {
    width: 500px;
    display: inline-block;
}

td {
    line-height: 40px;
    font-size: 15px;
}

td:nth-child(1) {
    color: #888;
    width: 200px;
}

td:nth-child(2) {
    text-align: left;
}
</style>
