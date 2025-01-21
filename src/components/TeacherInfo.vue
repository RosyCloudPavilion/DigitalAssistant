<template>
    <div class="teachers">
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
            教师列表
        </h4>

        <router-link to="/informationManagement/teacherInfo/teacherAdd" style="
          margin-left: 0px;
          display: inline-block;
          margin-bottom: 10px;
          position: relative;
          left: 300px;
          width: 110px;
          color: #000000;
        ">
            <span style="position: relative; left: 10px; top: -8px; width: 66px">添加教师</span>
        </router-link>

        <el-table :data="tableData.filter(
            (data) =>
                !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
            " style="width: 100%; margin-top: 0px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column label="工号" prop="teacher_id" width="70"> </el-table-column>
            <el-table-column label="教师姓名" prop="name" width="70"> </el-table-column>
            <el-table-column label="邮箱" prop="email" width="180"> </el-table-column>
            <el-table-column label="电话" prop="phone"> </el-table-column>
            <el-table-column label="部门" prop="department"> </el-table-column>
            <el-table-column label="职位" prop="position" width="70"> </el-table-column>
            <el-table-column align="right" width="200">
                <template slot-scope="" slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入教师姓名  关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改教师信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="formData" :rules="rules" ref="editForm" label-width="80px" labelPosition="left"
                style="width: 100%">
                <el-form-item label="教师编号：" prop="teacher_id">
                    <el-input v-model="formData.teacher_id" placeholder="请输入教师编号"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名：" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入教师姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="部门：" prop="department">
                    <el-input v-model="formData.department" placeholder="请输入部门"></el-input>
                </el-form-item>
                <el-form-item label="职位：" prop="position">
                    <el-input v-model="formData.position" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
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
                teacher_id: [{ required: true, message: "请输入教师编号", trigger: "blur" }],
                name: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
                department: [{ required: true, message: "请输入部门", trigger: "blur" }],
                position: [{ required: true, message: "请输入职位", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
        };
    },
    created() {
        this.request.get("/teachers").then(res => {
            if (res.data) {
                console.log(res.data);
                this.tableData = res.data;
            }
        })
    },
    methods: {
        handleEdit(index, row) {
            this.dialogFormVisible = true;
            this.formData = { ...row };
            console.log(this.formData);
        },
        submitEdit(formName) {
            console.log(this.formData);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.request.post("/updateTeacher", this.formData).then(res => {
                        if (res.data.success) {
                            this.$message.success("教师信息修改成功");
                            this.dialogFormVisible = false;
                            this.request.get("/teachers").then(res => {
                                if (res.data) {
                                    this.tableData = res.data;
                                }
                            });
                        } else {
                            this.$message.error("教师信息修改失败");
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
