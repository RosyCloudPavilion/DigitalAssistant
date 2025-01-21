<template>
    <div class="camera-add-wrapper">
        <div class="camera-add"></div>
        <el-page-header @back="goCameraInfo" content="摄像头列表"> </el-page-header>
        <h4 style="
              text-align: left;
              line-height: 20px;
              margin-top: 10px;
              margin-bottom: -100p;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
              margin-left: 20px;
            ">
            添加摄像头
        </h4>
        <el-card class="box-card showmain">
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="13" :offset="3">
                    <el-form :model="addForm" :rules="rules" ref="addForm" id="addForm" name="addForm" label-width="90px"  labelPosition="left" :status-icon="true">
                        <!-- 输入摄像头名称 -->
                        <el-form-item label="摄像头名称：" prop="name">
                            <el-input v-model="addForm.name" id="name" style="width: 420px" placeholder="请输入摄像头名称"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置摄像头名称</span>
                        </el-form-item>

                        <el-form-item label="摄像头ID：" prop="camera_id">
                            <el-input v-model="addForm.camera_id" id="camera_id" style="width: 420px" placeholder="请输入摄像头ID"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置摄像头ID</span>
                        </el-form-item>
                        <el-form-item label="位置：" prop="location">
                            <el-input v-model="addForm.location" id="location" style="width: 420px" placeholder="请输入位置"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置位置</span>
                        </el-form-item>

                        <el-form-item label="状态：" prop="status">
                            <el-input v-model="addForm.status" id="status" style="width: 420px" placeholder="请输入状态"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置状态</span>
                        </el-form-item>

                        <el-form-item label="班级ID：" prop="class_id">
                            <el-input v-model="addForm.class_id" id="class_id" style="width: 420px" placeholder="请输入班级ID"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置班级ID</span>
                        </el-form-item>
                        <el-form-item label="推拉流地址：" prop="address">
                            <el-input v-model="addForm.address" id="address" style="width: 420px" placeholder="请输入推拉流地址"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置推拉流地址</span>
                        </el-form-item>
                        <el-form-item label="学生ID：" prop="student_id">
                            <el-input v-model="addForm.student_id" id="student_id" style="width: 420px" placeholder="请输入学生ID"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置学生ID</span>
                        </el-form-item>
                        <!-- <el-form-item label="教师ID：" prop="teacher_id">
                            <el-input v-model="addForm.teacher_id" id="teacher_id" style="width: 420px" placeholder="请输入教师ID"></el-input>
                            <span class="inputtip"><span class="tipst">*</span>
                                设置教师ID</span>
                        </el-form-item> -->

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
    name: 'CameraAdd',
    data() {
        return {
            addForm: {
                camera_id: '',
                name: '',
                location: '',
                status: '',
                class_id: '',
                address: '',
                student_id: '',
                teacher_id: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入摄像头名称', trigger: 'blur' }
                ],
                camera_id: [
                    { required: true, message: '请输入摄像头ID', trigger: 'blur' }
                ],
                location: [
                    { required: false, message: '请输入位置', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请输入状态', trigger: 'blur' }
                ],
                class_id: [
                    { required: true, message: '请输入班级ID', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入推拉流地址', trigger: 'blur' }
                ],
                student_id: [
                    { required: false, message: '请输入学生ID', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        goCameraInfo() {
            console.log("goCameraInfo");
            this.$router.push("/informationManagement/cameraInfo");
        },
        submitForm() {
            this.request.post("/addCamera", JSON.stringify(this.addForm)).then(res => {
                console.log(res.success)
                if (res.success) {
                    this.$message({
                        message: "添加摄像头成功！",
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
