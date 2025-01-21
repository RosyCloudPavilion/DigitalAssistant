<template>
    <div class="cameras">
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
            摄像头列表
        </h4>

        <router-link to="/informationManagement/cameraInfo/cameraAdd" style="
          margin-left: 0px;
          display: inline-block;
          margin-bottom: 10px;
          position: relative;
          left: 300px;
          width: 110px;
          color: #000000;
        ">
            <span style="position: relative; left: 10px; top: -8px; width: 66px">添加摄像头</span>
        </router-link>

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
            班级摄像头列表
        </h4>
        <el-table :data="classCameras" style="width: 100%; margin-top: 0px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column label="摄像头编号" prop="camera_id"> </el-table-column>
            <el-table-column label="摄像头名称" prop="name"> </el-table-column>
            <el-table-column label="位置" prop="location"> </el-table-column>
            <el-table-column label="状态" prop="status"> </el-table-column>
            <el-table-column label="班级编号" prop="class_id"> </el-table-column>
            <el-table-column align="right">
                <template slot-scope="" slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入摄像头名称  关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

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
            个人摄像头列表
        </h4>
        <el-table :data="personalCameras" style="width: 100%; margin-top: 0px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column label="摄像头编号" prop="camera_id"> </el-table-column>
            <el-table-column label="摄像头名称" prop="name"> </el-table-column>
            <el-table-column label="学生学号" prop="student_id"> </el-table-column>
            <el-table-column label="状态" prop="status"> </el-table-column>
            <el-table-column label="班级编号" prop="class_id"> </el-table-column>
            <el-table-column align="right">
                <template slot-scope="" slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入摄像头名称  关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改摄像头信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="formData" :rules="rules" ref="editForm" label-width="80px" labelPosition="left"
                style="width: 100%">
                <el-form-item label="摄像头编号：" prop="camera_id">
                    <el-input v-model="formData.camera_id" placeholder="请输入摄像头编号"></el-input>
                </el-form-item>
                <el-form-item label="摄像头名称：" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入摄像头名称"></el-input>
                </el-form-item>
                <el-form-item label="位置：" prop="location">
                    <el-input v-model="formData.location" placeholder="请输入位置"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                    <el-input v-model="formData.status" placeholder="请输入状态"></el-input>
                </el-form-item>
                <el-form-item label="班级编号：" prop="class_id">
                    <el-input v-model="formData.class_id" placeholder="请输入班级编号"></el-input>
                </el-form-item>
                <el-form-item label="推拉流地址：" prop="address">
                    <el-input v-model="formData.address" placeholder="请输入班级编号"></el-input>
                </el-form-item>
                <el-form-item label="学生学号" prop="student_id">
                    <el-input v-model="formData.student_id" placeholder="请输入班级编号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEdit('editForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tableData: [],
            search: "",
            dialogFormVisible: false,
            formData: {},
            rules: {
                camera_id: [{ required: true, message: "请输入摄像头编号", trigger: "blur" }],
                name: [{ required: true, message: "请输入摄像头名称", trigger: "blur" }],
                location: [{ required: true, message: "请输入位置", trigger: "blur" }],
                status: [{ required: true, message: "请输入状态", trigger: "blur" }],
                class_id: [{ required: true, message: "请输入班级编号", trigger: "blur" }],
            },
            classCameras: [],
            personalCameras: []
        };
    },
    created() {
        this.request.get("/cameras").then(res => {
            if (res.data) {
                console.log(res.data);
                this.tableData = res.data;
                this.classifyCameras();
            }
        })
    },
    methods: {
        classifyCameras() {
            this.classCameras = this.tableData.filter(camera => !camera.student_id);
            this.personalCameras = this.tableData.filter(camera => camera.student_id);
        },
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.formData = { ...row };
            console.log(this.formData);
        },
        submitEdit(formName) {
            console.log(this.formData);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.request.post("/updateCamera", this.formData).then(res => {
                        if (res.data.success) {
                            this.$message.success("摄像头信息修改成功");
                            this.dialogFormVisible = false;
                            this.request.get("/cameras").then(res => {
                                if (res.data) {
                                    this.tableData = res.data;
                                }
                            });
                        } else {
                            this.$message.error("摄像头信息修改失败");
                        }
                    });
                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.tableData.splice(index, 1);
        }
    },
};
</script>

<style>
.el-dialog__headerbtn {
    text-align: center !important;
    width: 450px !important;
}
</style>
