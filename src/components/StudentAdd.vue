<!--添加学生信息  -->
<template>
<div class="studentadd">
    <el-page-header @back="gostudentall" content="学生列表"> </el-page-header>
    <!-- <h3 style="width: 700px">添加学生信息</h3> -->
    <h4 style="
          text-align: left;
          line-height: 20px;
          margin-top: 10px;
          margin-bottom: -100p;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          margin-left: 20px;
        ">
        添加学生
    </h4>
    <el-card class="box-card showmain">
        <el-row :gutter="24" style="box-sizing: border-box">
            <el-col :span="13" :offset="3">
                <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="90px" @validate="auto" labelPosition="left" :status-icon="true">
                    <!-- 输入用户名 -->
                    <el-form-item label="学生账号：" prop="UserName">
                        <el-input v-model="addForm.UserName" id="name" style="width: 420px" placeholder="请输入学生账号"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置5位以上的用户名(可以包含数字、字母、下划线)</span>
                    </el-form-item>

                    <!-- 输入密码 -->
                    <el-form-item label="密码：" prop="Password">
                        <el-input v-model="addForm.Password" type="password" id="password" placeholder="请输入密码"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置6位以上的密码(可以包含数字、字母、下划线)</span>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码：" prop="qrPassword">
                        <el-input v-model="addForm.qrPassword" type="password" id="qrPassword" placeholder="请再次输入密码"></el-input><span class="inputtip"><span class="tipst">*</span> 重新输入密码以确认密码</span>
                    </el-form-item>
                    <el-form-item label="学生姓名：" prop="RealName">
                        <el-input v-model="addForm.RealName" id="realname" placeholder="请输入学生姓名"></el-input>
                        <span class="inputtip"><span class="tipst">*</span> 请输入真实姓名</span>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="addForm.State">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                        <span class="inputtip"></span>
                    </el-form-item>
                    <el-form-item label="学号 :" prop="userid">
                        <el-input v-model="addForm.userid" id="userid" placeholder="请输入学号"></el-input><span class="inputtip"><span class="tipst">*</span> 输入10位学号</span>
                    </el-form-item>
                    <el-form-item label="邮箱 ：" prop="Email">
                        <el-input v-model="addForm.Email" id="Email" placeholder="请输入邮箱"></el-input><span class="inputtip"> </span>
                    </el-form-item>
                    <el-form-item label="手机号 ：" prop="Phone">
                        <el-input v-model="addForm.Phone" id="Phone" placeholder="请输入手机号"></el-input><span class="inputtip"></span>
                    </el-form-item>
                    <el-form-item label="备注 ：">
                        <el-input v-model="addForm.Description" type="textarea" id="Description" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <el-form-item label="选择班级：" style="width: 150px">
                        <el-select v-model="form.class" placeholder="请选择班级" @change="jl1" class="el-select1">
                            <el-option v-for="item in optionsClass" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 121.5.101.60 -->
                    <!-- ------------------------------------------------------------------------------------ -->
                    <el-upload ref="upload" action="#" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :data="addForm" :on-change="handleChange" :limit="3" :on-exceed="handleExceed" :auto-upload="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" multiple style="width: 300px">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb <br /><span style="color: red">*上传照片数量必须为3张*</span><br />
                            <img src="../assets/right.jpg" alt="" draggable="false" style="width: 80px; height: 80px" />
                            <img src="../assets/content.jpg" style="width: 80px; height: 80px" alt="" draggable="false" />
                            <img src="../assets/left.jpg" style="width: 80px; height: 80px" alt="" draggable="false" />
                        </div>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="" />
                    </el-dialog>
                    <br /><br />
                    <div style="text-align: center; width: 300px">
                        <!-- <span slot="footer" class="dialog-footer"> -->
                        <el-button @click="submitSign1('addForm')">添加</el-button>
                        <!-- <el-button type="primary" @click="submitSign1('addForm')"
                  >添 加</el-button
                > -->
                        <!-- </span> -->
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

  
<script>

export default {
    //import引入的组件需要注入到对象components中才能使用
    components: {},
    data() {
        // 账号验证方法
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
        // 邮箱验证方法
        var isEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("Email不能为空"));
            } else {
                // 这里写你的邮箱验证正则
                var s = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
                if (!s.test(value)) {
                    this.$message.error("您输入的邮箱地址有误，请重新填写");
                }
                callback();
            }
        };
        // 姓名验证方法
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
        // 学号验证方法
        var isStudentId = (rule, value, callback) => {
            console.log(value);
            if (!value) {
                return callback(new Error("学号不能为空"));
            } else {
                // 这里写你的邮箱验证(value是身份证号码)
                var s = /^\d{10}/;
                if (!s.test(value)) {
                    this.$message.error("您输入学号有误，请重新填写");
                }
                callback();
            }
        };
        // 手机号验证方法
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
            uploadForm: new FormData(),
            addForm: {
                StudentID: null,
                userid: "",
                UserName: "",
                Password: "",
                RealName: "",
                State: "",
                Phone: "",
                qrPassword: "",
                Email: "",
                photo: "",
                Description: "",
                ClassId: "",
            },
            imgArr: [],
            dialogImageUrl: "",
            dialogVisible: false,
            
            optionsClass: [],

            form: {
                student: 72,
                class: 105,
                group: 154,
            },
            formname: {
                student: "",
                class: "",
                group: "",
            },
            num: 0,
            abc: null,
           
            
            fileList: [],
            imgs: 0,
            //表单校验规则
            rules: {
                // 用户名
                UserName: [{
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
                Password: [{
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
                RealName: [{
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
                Email: [{
                        validator: isEmail,
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    {
                        min: 0,
                        max: 30,
                        message: "请输入邮箱",
                        trigger: "blur"
                    },
                ],
                Phone: [{
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
    //初始化
    mounted: function () {
        let map = new Map();
        for (let key in this.addForm) {
            map.set(key, this.addForm[key]);
        }
        this.abc = map;
        console.log(this.abc);
        console.log(map);
        
    },
    
    watch: {
        form: function () {
            console.log(666);
        },
        deep: true,

        // 表单数据发生变化同步到自定义对象中
        addForm: function (oldval, newval) {
            console.log(this.addForm);
            this.abc = this.addForm;
        },
        deep: true,
    },
    methods: {
        gostudentall() {
            this.$router.push("/informationManagement/studentInfo/studentAll");
        },
        auto(e, e1, e2) {
           
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 表单内容上传成功后执行方法
        handleAvatarSuccess(res) {
            this.imgs += 1;
            this.$refs.upload.clearFiles();
            if (this.imgs == 3) {
                // this.$message.success(res);
                alert(res);
                this.$refs.upload.clearFiles();
            }
            console.log(this.imgArr);
            console.log(res);
        },
        // 图片选中后上传前执行的方法,主要校验限制图片格式与大小
        beforeAvatarUpload(file) {
            // console.log(res);
            let types = ["image/jpeg", "image/png"];

            const isImage = types.includes(file.type);

            const isLtSize = file.size / 1024;
            console.log(isLtSize);

            if (!isImage) {
                this.$message.error("上传图片只能是 JPG、PNG 格式!");

                return false;
            }

            if (isLtSize >= 500) {
                this.$message.error("上传图片大小不能超过 500kb!");

                return false;
            }

            return true;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        

        handleChange(file, fileList) {
            // console.log(fileList);
            console.log(file);
            console.log(window.URL);
            // var imgURL = window.URL.createObjectURL(file);
            // console.log(imgURL);
            // console.log(this.$refs.upload.uploadFiles);
            // this.$refs.upload1.uploadFiles = this.$refs.upload.uploadFiles;
            this.imgArr = fileList;
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件`);
        },
        
        jl1() {
            let this_ = this;
            console.log(this.form.class);
            this.addForm.ClassId = this.form.class;
        },
       
        // 点击注册
        submitSign1(formName) {
            let newthis = this;
            newthis.num += 1;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var newthis = this;
                    var addForm = newthis.addForm;
                    if (addForm.Password != addForm.qrPassword) {
                        newthis.$message.error("两次密码输入不一致，请重新输入");
                        return;
                    }

                    if (newthis.imgArr.length < 3) {
                        newthis.$message.error("请上传3张照片");
                        return;
                    }
                    if (newthis.num == 1) {
                        for (var key in this.addForm) {
                            console.log(key);
                            console.log(this.addForm[key]);
                            this.uploadForm.append(key, this.addForm[key]);
                        }
                        // 上传单个文件形式
                        for (var i = 0; i < this.imgArr.length; i++) {
                            console.log(i);
                            console.log(this.imgArr[i].raw);
                            var name = "file" + (i + 1);
                            // i == 0 ? (name = "file") : (name = "file" + i);
                            this.uploadForm.append(name, this.imgArr[i].raw);
                        }
                        //上传数组形式
                        var thefiles = [];
                        for (var i = 0; i < this.imgArr.length; i++) {
                            console.log(this.imgArr[i].raw);

                            thefiles.push(this.imgArr[i].raw);
                        }
                        console.log(thefiles);
                        // this.num = 0;
                    }
                    // this.uploadForm.append(files, thefiles);
                    console.log(newthis.uploadForm);
                    
                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
        },
    },
};
</script>
  
<style scoped>
.el-input {
    width: 200px !important;
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

.el-select1 {
    margin-left: 20px;
}

.tipst {
    color: red;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
