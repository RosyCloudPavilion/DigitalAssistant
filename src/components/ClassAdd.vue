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
                    <el-form-item label="班级名称：" prop="className">
                        <el-input v-model="addForm.className" id="className" style="width: 420px" placeholder="请输入班级名称"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置班级名称</span>
                    </el-form-item>

                    <!-- 输入班级描述 -->
                    <el-form-item label="班级描述：" prop="classDescription">
                        <el-input v-model="addForm.classDescription" type="textarea" id="classDescription" placeholder="请输入班级描述"></el-input>
                        <span class="inputtip"><span class="tipst">*</span>
                            设置班级描述</span>
                    </el-form-item>

                    <br /><br />
                    <div style="text-align: center; width: 300px">
                        <el-button @click="submitForm('addForm')">添加</el-button>
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
                className: '',
                classDescription: ''
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
            this.$router.push("/informationManagement/classInfo");
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('Class Name:', this.addForm.className);
                    console.log('Class Description:', this.addForm.classDescription);
                    this.addForm = { className: '', classDescription: '' };
                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
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