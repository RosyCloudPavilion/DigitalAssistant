<template>
<div class="teacher-add">
    <el-page-header @back="goTeacherInfo" content="教师列表"> </el-page-header>
    <h4 style="
          text-align: left;
          line-height: 20px;
          margin-top: 10px;
          margin-bottom: -100p;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          margin-left: 20px;
        ">
        添加教师
    </h4>
    <el-card class="box-card showmain">
        <el-row :gutter="24" style="box-sizing: border-box">
            <el-col :span="13" :offset="3">
                <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="90px"  labelPosition="left" :status-icon="true">
                    <!-- 输入教师名称 -->
                    <el-form-item label="教师名称：" prop="name">
                        <el-input v-model="addForm.name" id="name" style="width: 420px" placeholder="请输入教师名称"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置教师名称</span>
                    </el-form-item>

                    <el-form-item label="教师ID：" prop="teacher_id">
                        <el-input v-model="addForm.teacher_id" id="teacher_id" style="width: 420px" placeholder="请输入教师ID"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置教师ID</span>
                    </el-form-item>

                    <el-form-item label="电子邮件：" prop="email">
                        <el-input v-model="addForm.email" id="email" style="width: 420px" placeholder="请输入电子邮件"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置电子邮件</span>
                    </el-form-item>

                    <el-form-item label="电话：" prop="phone">
                        <el-input v-model="addForm.phone" id="phone" style="width: 420px" placeholder="请输入电话"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置电话</span>
                    </el-form-item>

                    <el-form-item label="部门：" prop="department">
                        <el-input v-model="addForm.department" id="department" style="width: 420px" placeholder="请输入部门"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置部门</span>
                    </el-form-item>

                    <el-form-item label="职位：" prop="position">
                        <el-input v-model="addForm.position" id="position" style="width: 420px" placeholder="请输入职位"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置职位</span>
                    </el-form-item>

                    <el-form-item label="性别：" prop="gender">
                        <el-input v-model="addForm.gender" id="gender" style="width: 420px" placeholder="请输入性别"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置性别</span>
                    </el-form-item>

                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="addForm.password" id="password" style="width: 420px" placeholder="请输入密码" type="password"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置密码</span>
                    </el-form-item>

                    <br /><br />
                    <div style="text-align: center; width: 300px">
                        <el-button @click="submitForm()">添加</el-button>
                    </div>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</div>
</template>

<script>
export default {
    name: 'TeacherAdd',
    data() {
        return {
            addForm: {
                teacher_id: '',
                name: '',
                email: '',
                phone: '',
                department: '',
                position: '',
                gender: '',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入教师名称', trigger: 'blur' }
                ],
                teacher_id: [
                    { required: true, message: '请输入教师ID', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入电子邮件', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请输入部门', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '请输入职位', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请输入性别', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        goTeacherInfo() {
            console.log("goTeacherInfo");
            this.$router.push("/informationManagement/teacherInfo");
        },
        submitForm() {
            this.request.post("/addTeacher", JSON.stringify(this.addForm)).then(res => {
                console.log(res.success)
                if (res.success) {
                    this.$message({
                        message: "添加教师成功！",
                        type: "warning",
                    });
                    this.notset = true
                }else{
                    this.$message({
                        message: "添加失败",
                        type: "error",
                    });
                }

            })
        }
    }
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

.tipst {
    color: red;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
