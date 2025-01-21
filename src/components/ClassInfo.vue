<!--  -->
<template>
    <div class="classes">
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
            班级列表
        </h4>

        <router-link to="/informationManagement/classInfo/classAdd" style="
          margin-left: 0px;
          display: inline-block;
          margin-bottom: 10px;
          position: relative;
          left: 300px;
          width: 110px;
          color: #000000;
        ">
            <span style="position: relative; left: 10px; top: -8px; width: 66px">添加班级</span>
        </router-link>

        <el-table :data="tableData.filter(
            (data) =>
                !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
            " style="width: 100%; margin-top: 0px">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column label="班号" prop="class_id"> </el-table-column>
            <el-table-column label="班级名称" prop="name"> </el-table-column>
            <el-table-column label="年级" prop="grade"> </el-table-column>
            <el-table-column label="人数" prop="student_count"> </el-table-column>
            <el-table-column align="right">
                <template slot-scope="" slot="header">
                    <el-input v-model="search" size="mini" placeholder="输入班级名称  关键字搜索" />
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改班级信息" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="formData" :rules="rules" ref="editForm" label-width="80px" labelPosition="left"
                style="width: 100%">
                <el-form-item label="班号：" prop="class_id">
                    <el-input v-model="formData.class_id" placeholder="请输入班号"></el-input>
                </el-form-item>
                <el-form-item label="班级名称：" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入班级名称"></el-input>
                </el-form-item>
                <el-form-item label="年级：" prop="grade">
                    <el-input v-model="formData.grade" placeholder="请输入年级"></el-input>
                </el-form-item>
                <el-form-item label="人数：" prop="student_count">
                    <el-input v-model="formData.student_count" placeholder="请输入人数"></el-input>
                </el-form-item>
                <el-divider>教师信息</el-divider>
                <el-form-item label="教师姓名：" prop="teacher.name">
                    <el-input v-model="formData.teacher.name" placeholder="请输入教师姓名"></el-input>
                </el-form-item>
                <el-form-item label="教师邮箱：" prop="teacher.email">
                    <el-input v-model="formData.teacher.email" placeholder="请输入教师邮箱"></el-input>
                </el-form-item>
                <el-form-item label="教师电话：" prop="teacher.phone">
                    <el-input v-model="formData.teacher.phone" placeholder="请输入教师电话"></el-input>
                </el-form-item>
                <el-form-item label="教师部门：" prop="teacher.department">
                    <el-input v-model="formData.teacher.department" placeholder="请输入教师部门"></el-input>
                </el-form-item>
                <el-form-item label="教师职位：" prop="teacher.position">
                    <el-input v-model="formData.teacher.position" placeholder="请输入教师职位"></el-input>
                </el-form-item>
                <el-divider>学生信息</el-divider>
                <el-table :data="formData.students" style="width: 100%; margin-top: 10px">
                    <el-table-column type="index" label="序号" align="center" width="50"> </el-table-column>
                    <el-table-column label="学号" prop="student_id" align="center" width="110"> </el-table-column>
                    <el-table-column label="姓名" prop="name" align="center" width="150"> </el-table-column>
                    <el-table-column label="邮箱" prop="email" align="center" width="200"> </el-table-column>
                    <el-table-column label="电话" prop="phone" align="center" width="120"> </el-table-column>
                    <el-table-column label="性别" prop="gender" align="center" width="70"> </el-table-column>
                    <el-table-column align="right" width="200">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEditStudent(scope.$index, scope.row)">Edit</el-button>
                            <el-button size="mini" type="danger"
                                @click="handleDeleteStudent(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEdit('editForm')">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改学生信息" :visible.sync="dialogStudentFormVisible">
            <el-form :model="studentFormData" :rules="studentRules" ref="studentEditForm" label-width="80px"
                labelPosition="left" style="width: 100%">
                <el-form-item label="学号：" prop="student_id">
                    <el-input v-model="studentFormData.student_id" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" prop="name">
                    <el-input v-model="studentFormData.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="studentFormData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="电话：" prop="phone">
                    <el-input v-model="studentFormData.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="性别：" prop="gender">
                    <el-radio-group v-model="studentFormData.gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogStudentFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEditStudent('studentEditForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {

    components: {},
    data() {
        return {
            tableData: [],
            search: "",
            dialogFormVisible: false,
            dialogStudentFormVisible: false,
            formData: {
                teacher: {},
                students: []
            },
            studentFormData: {},
            rules: {
                class_id: [{ required: true, message: "请输入班号", trigger: "blur" }],
                name: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
                grade: [{ required: true, message: "请输入年级", trigger: "blur" }],
                student_count: [{ required: true, message: "请输入人数", trigger: "blur" }],
            },
            studentRules: {
                student_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
                name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
                phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
                gender: [{ required: true, message: "请选择性别", trigger: "change" }],
            },
        };
    },
    created() {
        this.request.get("/classes").then(res => {
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
        handleEditStudent(index, row) {
            this.dialogStudentFormVisible = true;
            this.studentFormData = { ...row };
        },
        submitEdit(formName) {
            console.log(this.formData);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.request.post("/updateClass", this.formData).then(res => {
                        if (res.data.success) {
                            this.$message.success("班级信息修改成功");
                            this.dialogFormVisible = false;
                            this.request.get("/classes").then(res => {
                                if (res.data) {
                                    this.tableData = res.data;
                                }
                            });
                        } else {
                            this.$message.error("班级信息修改失败");
                        }
                    });
                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
        },
        submitEditStudent(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const index = this.formData.students.findIndex(student => student.id === this.studentFormData.id);
                    if (index !== -1) {
                        this.formData.students.splice(index, 1, { ...this.studentFormData });
                    }
                    this.dialogStudentFormVisible = false;
                } else {
                    alert("表单信息填写有误");
                    return false;
                }
            });
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.tableData.splice(index, 1);
        },
        handleDeleteStudent(index, row) {
            console.log(index, row);
            this.formData.students.splice(index, 1);
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
