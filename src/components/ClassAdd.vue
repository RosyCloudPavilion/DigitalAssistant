<template>
<div class="class-add">
    <el-page-header @back="goClassInfo" content="班级列表"> </el-page-header>
    <h4 style="
          text-align: left;
          line-height: 20px;
          margin-top: 10px;
          margin-bottom: -100p;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          margin-left: 20px;
        ">
        添加班级
    </h4>
    <el-card class="box-card showmain">
        <el-row :gutter="24" style="box-sizing: border-box">
            <el-col :span="13" :offset="3">
                <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="90px"  labelPosition="left" :status-icon="true">
                    <!-- 输入班级名称 -->
                    <el-form-item label="班级名称：" prop="name">
                        <el-input v-model="addForm.name" id="name" style="width: 420px" placeholder="请输入班级名称"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置班级名称</span>
                    </el-form-item>

                    <el-form-item label="班号：" prop="class_id">
                        <el-input v-model="addForm.class_id" id="class_id" style="width: 420px" placeholder="请输入班号"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置班号</span>
                    </el-form-item>
                    <el-form-item label="年级：" prop="grade">
                        <el-input v-model="addForm.grade" id="grade" style="width: 420px" placeholder="请输入年级"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置年级</span>
                    </el-form-item>

                    <el-form-item label="教师ID：" prop="teacher_id">
                        <el-input v-model="addForm.teacher_id" id="teacher_id" style="width: 420px" placeholder="请输入教师ID"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置教师ID</span>
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
    name: 'ClassAdd',
    data() {
        return {
            addForm: {
                class_id: '',
                name: '',
                grade: '',
                teacher_id: '',
            },
            rules: {
                className: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' }
                ],
                classDescription: [
                    { required: true, message: '请输入班级描述', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        goClassInfo() {
            console.log("goClassInfo");
            this.$router.push("/informationManagement/classInfo");
        },
        submitForm() {
            this.request.post("/addClass", JSON.stringify(this.addForm)).then(res => {
                console.log(res.success)
                if (res.success) {
                    this.$message({
                        message: "添加班级成功！",
                        type: "warning",
                    });
                    this.notset = true
                }else{
                    this.$message({
                        message: "修改失败",
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