<template>
  <div class="parent-add-wrapper">
    <div class="parent-add"></div>
    <el-page-header @back="goParentInfo" content="家长列表"> </el-page-header>
    <h4 style="
          text-align: left;
          line-height: 20px;
          margin-top: 10px;
          margin-bottom: -100p;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          margin-left: 20px;
        ">
        添加家长
    </h4>
    <el-card class="box-card showmain">
        <el-row :gutter="24" style="box-sizing: border-box">
            <el-col :span="13" :offset="3">
                <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="90px"  labelPosition="left" :status-icon="true">
                    <!-- 输入家长名称 -->
                    <el-form-item label="家长名称：" prop="name">
                        <el-input v-model="addForm.name" id="name" style="width: 420px" placeholder="请输入家长名称"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置家长名称</span>
                    </el-form-item>

                    <el-form-item label="家长ID：" prop="parent_id">
                        <el-input v-model="addForm.parent_id" id="parent_id" style="width: 420px" placeholder="请输入家长ID"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置家长ID</span>
                    </el-form-item>
                    <el-form-item label="电子邮件：" prop="email">
                        <el-input v-model="addForm.email" id="email" style="width: 420px" placeholder="请输入电子邮件"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置电子邮件</span>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="phone">
                        <el-input v-model="addForm.phone" id="phone" style="width: 420px" placeholder="请输入联系电话"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置联系电话</span>
                    </el-form-item>
                    <el-form-item label="学生学号" prop="student_id">
                        <el-input v-model="addForm.student_id" id="student_id" style="width: 420px" placeholder="输入学生学号"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置关联学生</span>
                    </el-form-item>
                    <el-form-item label="关系：" prop="relationship">
                        <el-input v-model="addForm.relationship" id="relationship" style="width: 420px" placeholder="请输入关系"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置关系</span>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="addForm.password" id="password" style="width: 420px" placeholder="请输入密码"></el-input>
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
    name: 'ParentAdd',
    data() {
        return {
            addForm: {
                parent_id: '',
                name: '',
                email: '',
                phone: '',
                relationship: '',
                password: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入家长名称', trigger: 'blur' }
                ],
                parent_id: [
                    { required: true, message: '请输入家长ID', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入电子邮件', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ],
                student_id: [
                    { required: true, message: '请输入学生学号', trigger: 'blur' }
                ],
                relationship: [
                    { required: true, message: '请输入关系', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        goParentInfo() {
            console.log("goParentInfo");
            this.$router.push("/informationManagement/parentInfo");
        },
        submitForm() {
            this.request.post("/addParent", JSON.stringify(this.addForm)).then(res => {
                console.log(res.success)
                if (res.success) {
                    this.$message({
                        message: "添加家长成功！",
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
