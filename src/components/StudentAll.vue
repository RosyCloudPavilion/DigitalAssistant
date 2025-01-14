<template>
    <div class="studentalter">
        <h4 style="
          text-align: left;
          line-height: 20px;
          margin-top: 10px;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          margin-left: 20px;
          position: relative;
          left: 0px;
        ">
            学生列表
        </h4>

        <router-link to="/informationManagement/studentInfo/studentAdd" style="
          margin-left: 0px;
          display: inline-block;
          margin-bottom: 10px;
          position: relative;
          left: 300px;
          width: 110px;
          color: #000000;
        ">
            <span style="position: relative; left: 10px; top: -8px; width: 66px">添加学生</span>
        </router-link>

        <el-table :data="tableData.filter(
            (data) =>
                !search ||
                data.realName.toLowerCase().includes(search.toLowerCase())
        )
            " style="width: 100%; margin-top: 10px">
            <el-table-column type="index" label="序号" align="center" width="50" border>
            </el-table-column>
            <!-- <el-table-column label="ID" prop="id" align="center" width="50" border>
        </el-table-column> -->
            <el-table-column label="学号" prop="value" align="center" width="110" border>
            </el-table-column>
            <el-table-column label="姓名" prop="realName" align="center" width="70" border>
            </el-table-column>
            <el-table-column label="性别" prop="state" align="center" width="50">
            </el-table-column>
            <el-table-column label="邮箱" prop="email" align="center" width="200">
            </el-table-column>
            <el-table-column label="手机号码" prop="phone" align="center" width="120">
            </el-table-column>
            <el-table-column label="备注" prop="description" align="center">
            </el-table-column>
            <el-table-column align="right" width="140">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" width="120" style="width: 120px" />
                </template>
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" style="background-color: #38c3a1; color: #fff"
                        @click="handleEdit(scope.$index, scope.row)" circle></el-button>
                    <el-button style="margin-right: 20px" type="danger" icon="el-icon-delete"
                        @click="handleDelete(scope.$index, scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 修改学生信息界面,默认关闭 -->
        <el-dialog title="修改" :visible.sync="dialogFormVisible">
            <el-form :model="gridData" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="80px"
                labelPosition="left" style="width: 80%">
                <!-- 输入用户名 -->
                <el-form-item label="用户名：" prop="userName">
                    <el-input v-model="gridData.userName" id="userName" placeholder="请输入用户名"
                        @change="usernamechange"></el-input>
                    <span class="inputtip"><span class="tipst">*</span>
                        设置5位以上的用户名(可以包含数字、字母、下划线)</span>
                </el-form-item>
                <el-form-item label="姓名：" prop="realName">
                    <el-input v-model="gridData.realName" id="realname" @change="realNamechange"
                        placeholder="请输入姓名"></el-input>
                    <span class="inputtip"><span class="tipst">*</span> 请输入真实姓名</span>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="gridData.password" type="password" @change="passwordchange" id="password"
                        placeholder="请输入密码"></el-input>
                    <span class="inputtip"><span class="tipst">*</span>
                        设置6位以上的密码(可以包含数字、字母、下划线)</span>
                </el-form-item>
                <el-form-item label="性别 ：">
                    <el-radio-group v-model="gridData.state" @change="statechange">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                    <span class="inputtip"></span>
                </el-form-item>
                <el-form-item label="学号 ：" prop="userid">
                    <el-input v-model="gridData.userid" id="userID" @change="useridchange"
                        placeholder="请输入学号"></el-input><span class="inputtip"><span class="tipst">*</span>
                        输入10位学号</span>
                </el-form-item>
                <el-form-item label="邮箱 ：" prop="email">
                    <el-input v-model="gridData.email" id="email" @change="emailchange"
                        placeholder="请输入邮箱"></el-input><span class="inputtip"> </span>
                </el-form-item>
                <el-form-item label="手机号 ：" prop="phone">
                    <el-input v-model="gridData.phone" id="phone" @change="phonechange"
                        placeholder="请输入手机号"></el-input><span class="inputtip"></span>
                </el-form-item>
                <el-form-item label="选择班级：" style="width: 150px">
                    <el-select v-model="form.class" placeholder="请选择班级" @change="jl1" class="el-select1">
                        <el-option v-for="item in optionsClass" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <span class="inputtip"></span> -->
                </el-form-item>
                <span style="position: relative; top: -30px; left: 0px">采样照片 ：</span>
                <a href="javascript:;" class="a-upload1">
                    <input type="file" accept="image/*" name="" id="file1" @change="inputimg" />
                </a>
                <a href="javascript:;" class="a-upload2">
                    <input type="file" accept="image/*" name="" id="file2" @change="inputimg" />
                </a>
                <a href="javascript:;" class="a-upload3">
                    <input type="file" accept="image/*" name="" id="file3" @change="inputimg" />
                </a>
                <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
                <br /><br />
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSign1('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    //import引入的组件需要注入到对象components中才能使用
    components: {},
    data() {
        var isId = (rule, value, callback) => {
            console.log(value);
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else {
                var s = /^[a-zA-Z0-9_]{5,15}$/;
                if (!s.test(value)) {
                    this.$message.error("您输入的用户名有误，请重新填写");
                }
                callback();
                let th = this;
                // $.ajax({
                //   type: "POST",
                //   url: "",
                //   data: { name: value },
                //   dataType: "json",
                //   success: function (result) {
                //     // if (result == 1) {
                //     //   th.$message.error("该用户名已经注册");
                //     //   return false;
                //     // }
                //   },
                //   error: function () {
                //     console.log("error submit!!");
                //     return false;
                //   },
                // });
                callback();
            }
        };
        var isEmail = (rule, value, callback) => {
            console.log(value);
            if (!value) {
                return callback(new Error("Email不能为空"));
            } else {
                // 这里写你的邮箱验证(value是身份证号码)
                var s = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
                if (!s.test(value)) {
                    this.$message.error("您输入的邮箱地址有误，请重新填写");
                }
                return callback();
            }
        };
        var isRealName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("姓名不能为空"));
            } else {
                // 这里写你的邮箱验证(value是身份证号码)
                // var s = /^[\u4e00-\u9fa5]{2,10}$|^[a-zA-Z]{3,20}$/;
                var s = /^[\u4e00-\u9fa5]{2,10}$|^[a-zA-Z]{3,20}$/;
                if (!s.test(value)) {
                    this.$message.error("您输入姓名格式有误，请重新填写");
                }
                console.log(value);
                callback();
            }
        };
        var isStudentId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("学号不能为空"));
            } else {
                // 这里写你的邮箱验证(value是input内容)
                var s = /^\d{10}/;
                if (!s.test(value)) {
                    this.$message.error("您输入学号有误，请重新填写");
                }
                callback();
            }
        };
        var isPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("电话不能为空"));
            } else {
                // 这里写你的邮箱验证(value是身份证号码)
                var s =
                    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                if (!s.test(value)) {
                    this.$message.error("您输入手机号有误，请重新填写");
                }
                callback();
            }
        };
        return {
            gridData: {},
            dialogFormVisible: false,
            tableData: [
                {
                    id: 1,
                    userid: 2,
                    realName: "苏永甫",
                    state: "男",
                    email: "suyongfu@m.fudan.edu.cn",
                    phone: "12345678910",
                    description: "硕士研究生",
                    value: "22210240271",
                    label: "苏永甫"
                },
                {
                    id: 2,
                    userid: 3,
                    realName: "谢万超",
                    state: "男",
                    email: "xiewanchao@m.fudan.edu.cn",
                    phone: "12445678910",
                    description: "硕士研究生",
                    value: "22210240325",
                    label: "谢万超"
                },
                {
                    id: 4,
                    userid: 5,
                    realName: "吴斌",
                    state: "男",
                    email: "wubin@m.fudan.edu.cn",
                    phone: "13612345678",
                    description: "博士研究生",
                    value: "18110240013",
                    label: "吴斌"
                },
                {
                    id: 5,
                    userid: 6,
                    realName: "赵一飞",
                    state: "男",
                    email: "zhaoyifei@m.fudan.edu.cn",
                    phone: "13712345678",
                    description: "博士研究生",
                    value: "19110240026",
                    label: "赵一飞"
                },
                {
                    id: 6,
                    userid: 7,
                    realName: "王帅宇",
                    state: "男",
                    email: "wangshuaiyu@m.fudan.edu.cn",
                    phone: "13812345678",
                    description: "硕士研究生",
                    value: "20212010031",
                    label: "王帅宇"
                },
                {
                    id: 7,
                    userid: 8,
                    realName: "姚鑫玉",
                    state: "男",
                    email: "yaoxinyu@m.fudan.edu.cn",
                    phone: "13912345678",
                    description: "硕士研究生",
                    value: "20210240125",
                    label: "姚鑫玉"
                },
                {
                    id: 8,
                    userid: 9,
                    realName: "包智超",
                    state: "男",
                    email: "baozhichao@m.fudan.edu.cn",
                    phone: "14012345678",
                    description: "硕士研究生",
                    value: "21210240113",
                    label: "包智超"
                },
                {
                    id: 9,
                    userid: 10,
                    realName: "王朔",
                    state: "男",
                    email: "wangshuo@m.fudan.edu.cn",
                    phone: "14112345678",
                    description: "硕士研究生",
                    value: "21210240340",
                    label: "王朔"
                },
                {
                    id: 10,
                    userid: 11,
                    realName: "徐铮",
                    state: "男",
                    email: "xuzheng@m.fudan.edu.cn",
                    phone: "14212345678",
                    description: "硕士研究生",
                    value: "22210240335",
                    label: "徐铮"
                }
            ],
            setfData: {},
            search: "",
            uploadForm: new FormData(),
            addForm: {
                // StudentID: 123456789,
                // userid: "1234567890",
                // UserName: "12345",
                // Password: "123456",
                // RealName: "郑洪松",
                // State: "男",
                // Phone: "17638594658",
                // qrPassword: "123456",
                // Email: "2464974830@m.fudan.edu.cn",
                // photo: "ghjk",
                // Description: "我是大帅哥",
            },
            imgArr: {},
            dialogImageUrl: "",
            dialogVisible: false,
            optionsClass: [],
            form: {
                class: 154,
                group: 154,
            },
            formname: {
                class: "",
                group: "",
            },

            fileList: [],
            value: "",
            imgs: 0,
            //校验
            rules: {
                userName: [{
                    validator: isId,
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
                {
                    min: 5,
                    max: 100,
                    message: "请输入5位以上用户名",
                    trigger: "blur"
                },
                ],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                },
                {
                    min: 6,
                    max: 100,
                    message: "请输入6位以上密码",
                    trigger: "blur"
                },
                ],
                qrPassword: [{
                    required: true,
                    message: "请确认密码",
                    trigger: "blur"
                },
                {
                    min: 6,
                    max: 100,
                    message: "请输入6位以上密码",
                    trigger: "blur"
                },
                ],
                userid: [{
                    validator: isStudentId,
                    required: true,
                    message: "请输入学号",
                    trigger: "blur",
                },
                {
                    min: 10,
                    max: 10,
                    message: "请输入10位学号",
                    trigger: "blur"
                },
                ],
                realName: [{
                    validator: isRealName,
                    required: true,
                    message: "请输入姓名",
                    trigger: "blur",
                },
                {
                    min: 2,
                    max: 10,
                    message: "请输入2位以上汉字或3位以上英文",
                    trigger: "blur",
                },
                ],
                email: [{
                    validator: isEmail,
                    required: true,
                    message: "请输入正确的邮箱",
                    trigger: "blur",
                },
                {
                    min: 0,
                    max: 30,
                    message: "请输入邮箱",
                    trigger: "blur"
                },
                ],
                phone: [{
                    validator: isPhone,
                    required: true,
                    message: "请输入手机号",
                    trigger: "blur",
                },
                {
                    min: 0,
                    max: 30,
                    message: "请输入手机号",
                    trigger: "blur"
                },
                ],
            },
        };
    },
    mounted: function () {
        var _this = this;
        this.tp();
    },
    // updated: function () {
    //   console.log(100);
    //   this.$nextTick(() => {
    //     this.$refs.tree.setCheckedKeys(list);
    //   });
    // },
    methods: {
        tp() {


        },
        // 更改图片后执行方法

        inputimg(e, filelist) {
            // console.log(e.target.parentNode);
            var targetname = e.target.parentNode;
            var reads = new FileReader();
            reads.readAsDataURL(e.target.files[0]);
            // console.log(reads.readAsDataURL());
            var tahtnum = null;
            var f = e.target.files[0];
            if (f.type == "image/png" || f.type == "image/jpeg") {
                console.log(f.size / 1024);
                if (f.size / 1024 <= 500) {
                    if (e.target.id == "file1") {
                        // targetname = "a-upload1";
                        this.imgArr[e.target.id] = f;
                        this.imgArr.photo1 = this.gridData.photo1;
                    } else if (e.target.id == "file2") {
                        // targetname = "a-upload2";
                        this.imgArr.photo2 = this.gridData.photo2;
                        this.imgArr[e.target.id] = f;
                    } else if (e.target.id == "file3") {
                        // targetname = "a-upload3";
                        this.imgArr[e.target.id] = f;
                        this.imgArr.photo3 = this.gridData.photo3;
                    }
                    reads.onload = function (e) {
                        console.log(this.result.split("data:image/jpeg;base64,")[1]);
                        // var dt = JSON.stringify({
                        //   user: 14,
                        //   data: [this.result.split("data:image/jpeg;base64,")[1]],
                        // });
                        // console.log(dt);
                        // $.ajax({
                        //   type: "POST",
                        //   data: dt,
                        //   contentType: "application/json;charset=UTF-8",
                        //   url: "http://106.54.160.176:25000/view_resource",
                        //   success: function (result) {
                        //     console.log("成功:", result);
                        //     // if (result == 1) {
                        //     // alert("课时录入成功,请开始上课");
                        //     // }
                        //   },
                        //   error: function (err) {
                        //     console.log(err);
                        //   },
                        // });

                        targetname.style.background = "url(" + this.result + ") no-repeat";
                        // console.log(targetbgi.style.background);
                        targetname.style.backgroundSize = "80px 80px";
                        console.log(3);
                    };
                    console.log(this.imgArr);
                } else {
                    e.target.value = "";
                    alert("图片不大于500k");
                }
            } else {
                e.target.value = "";
                alert(`图片应是png或者jpg格式,现在上传的是${f.type.split("/")[1]}格式`);
            }

            // console.log(e);
            // console.log(e.target.files[0]);
        },
        // 点击修改按钮修改
        handleEdit(index, row) {
            var _this = this;
            this.dialogFormVisible = true;
            this.gridData = {};
            this.setfData = {};
            this.gridData = row;
            this.setfData.id = row.id;
            this.setfData.userid = row.userid;
            console.log(this.setfData);

            setTimeout(function () {
                var showfile1 = document.getElementsByClassName("a-upload1")[0];
                var showfile2 = document.getElementsByClassName("a-upload2")[0];
                var showfile3 = document.getElementsByClassName("a-upload3")[0];
                showfile1.style.background =
                    "url(http://121.5.101.60:8011/yyc/i-users/ShowFile1?url=" +
                    _this.gridData.photo1 +
                    ") no-repeat";
                console.log(561);
                showfile1.style.backgroundSize = "80px 80px";
                showfile2.style.background =
                    "url(http://121.5.101.60:8011/yyc/i-users/ShowFile2?url=" +
                    _this.gridData.photo2 +
                    ") no-repeat";
                showfile2.style.backgroundSize = "80px 80px";
                showfile3.style.background =
                    "url(http://121.5.101.60:8011/yyc/i-users/ShowFile3?url=" +
                    _this.gridData.photo3 +
                    ") no-repeat";
                showfile3.style.backgroundSize = "80px 80px";
                console.log(_this.gridData);
            }, 50);

            var str = row.password;
            console.log(this.gridData);
        },
        usernamechange(v) {
            this.setfData.username = v;
            console.log(v);
            console.log(this.setfData.username);
        },
        statechange(v) {
            this.setfData.state = v;
            console.log(this.setfData.state);
        },
        useridchange(v) {
            this.setfData.userid = v;
        },
        realNamechange(v) {
            this.setfData.realName = v;
            console.log(this.setfData.realName);
        },
        passwordchange(v) {
            this.setfData.password = v;
            console.log(this.setfData.password);
        },
        emailchange(v) {
            this.setfData.email = v;
            console.log(this.setfData.email);
        },
        phonechange(v) {
            this.setfData.phone = v;
            console.log(this.setfData.phone);
        },
        descriptionchange(v) {
            this.setfData.description = v;
            console.log(this.setfData.description);
        },


        jl1() {

        },

        // 点击修改
        submitSign1(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
        },


        handleDelete(index, row) {
            console.log(index, row);
            var _this = this;
            // 实际删除时发送删除请求,删除成功当前页面再进行删除
            var delitem = row;
            var formdata = new FormData();
            for (var key in row) {
                if (
                    key != "file" &&
                    key != "file1" &&
                    key != "file2" &&
                    key != "file3"
                ) {
                    formdata.append(key, row[key]);
                    console.log(row[key]);
                }
            }
        },
    },
};
</script>

<style scoped>
/* .studentalter { */
/* background-image: url("C:/Users/郑洪松/Pictures/Saved Pictures/bg.gif"); */
/* } */
.showmain {
    /* margin-top: 100px; */
    height: 80% !important;
    overflow: hidden;
}

.el-popover {
    top: 0px !important;
    height: 200px !important;
}

.el-popper {
    height: 600px !important;
    overflow-y: auto !important;
}

.el-input {
    width: 200px;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.inputtip {
    color: #ccc;
    padding-left: 20px;
    font-size: 10px;
    width: 160px;
    padding-left: 20px;
    font-size: 10px;
    display: inline-block;
    line-height: 13px;
    text-align: left;
    top: 5px;
    position: relative;
}

.el-scrollbar__wrap {
    right: 100px;
    /* overflow-x: hidden !important; */
    /* overflow-y: hidden !important; */
}

.el-scrollbar {
    margin-right: -10px;
}

.thediv {
    /* background-image: url("../../assets/login.png"); */
    background-size: 200px 150px;
    width: 200px !important;
    height: 150px !important;
    /* opacity: 0; */
    /* position: absolute;
    top: 0px; */
}

.a-upload1 {
    /* background-image: url("http://192.168.31.126:8011/yyc/i-users/ShowFile3?url=E:/images/b0955b69-b516-4656-9b93-450c534aaf25download.png"); */
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
    opacity: 0.6;
}

.a-upload2 {
    /* background-image: url("http://192.168.31.126:8011/yyc/i-users/ShowFile3?url=E:/images/b0955b69-b516-4656-9b93-450c534aaf25download.png"); */

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
}

.a-upload2 input {
    /* background-image: url("../../assets/login.png"); */
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    /* filter: alpha(opacity=0); */
    cursor: pointer;
}

.a-upload2:hover {
    text-decoration: none;
    opacity: 0.6;
}

.a-upload3 {
    /* background-image: url("C:/Users/郑洪松/Pictures/Saved Pictures/bg.gif"); */
    /* background-image: url("http://192.168.31.126:8011/yyc/i-users/ShowFile3?url=E:/images/b0955b69-b516-4656-9b93-450c534aaf25download.png"); */
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
}

.a-upload3 input {
    /* background-image: url("../../assets/login.png"); */
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    /* filter: alpha(opacity=0); */
    cursor: pointer;
}

.a-upload3:hover {
    text-decoration: none;
    opacity: 0.6;
}

.el-dialog__headerbtn {
    text-align: center !important;
    width: 450px !important;
}

.el-select1 {
    margin-left: 20px;
}

.el-icon-circle-plus-outline {
    font-size: 40px;
    margin-top: 10px;
    /* margin-left: 100px; */
}
</style>
