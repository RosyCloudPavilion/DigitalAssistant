<template>
    <div class="update-student">
        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                    font-size: 20px;
                    padding-left: 1px;
                  "><strong>&nbsp;&nbsp;&nbsp;&nbsp;个人信息修改</strong></span>
                        </div>
                    </el-col>
                </el-row>
            </el-button-group>
        </el-card><br />
        <el-form :model="user" ref="addForm" id="addForm" name="addForm" label-width="80px" labelPosition="left"
            style="width: 80%; margin-left: 20px">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="user.name" id="name" placeholder="请输入姓名"></el-input>
                <span class="inputtip"><span class="tipst">*</span> 请输入真实姓名</span>
            </el-form-item>
            <el-form-item label="部门：" prop="department" v-if="user.role == 'teacher' || user.role == 'admin'">
                <el-input v-model="user.department" id="department" placeholder="请输部门"></el-input>
                <span class="inputtip"><span class="tipst">*</span> 请输部门</span>
            </el-form-item>
            <el-form-item label="职位：" prop="position" v-if="user.role == 'teacher' || user.role == 'admin'">
                <el-input v-model="user.position" id="position" placeholder="请输职位"></el-input>
                <span class="inputtip"><span class="tipst">*</span> 请输职位</span>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="user.password" type="password" id="password" placeholder="请输入密码"></el-input>
                <span class="inputtip"><span class="tipst">*</span> 设置6位以上的密码(可以包含数字、字母、下划线)</span>
            </el-form-item>
            <el-form-item label="性别 ：" v-if="user.role == 'student' || user.role == 'teacher'">
                <el-radio-group v-model="user.gender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
                <span class="inputtip"></span>
            </el-form-item>
            <!-- <el-form-item label="学号 ：" prop="user_id" v-if="user.role == 'student'">
                <el-input v-model="student.student_id" id="student_id"
                    placeholder="请输入学号"></el-input>
                <span class="inputtip"><span class="tipst">*</span> 输入学号</span>
            </el-form-item> -->
            <el-form-item label="邮箱 ：" prop="email">
                <el-input v-model="user.email" id="email" placeholder="请输入邮箱"></el-input>
                <span class="inputtip"></span>
            </el-form-item>
            <el-form-item label="手机号 ：" prop="phone">
                <el-input v-model="user.phone" id="phone" placeholder="请输入手机号"></el-input>
                <span class="inputtip"></span>
            </el-form-item>
            <el-form-item label="学生学号 ：" prop="student_id" v-if="user.role == 'parent'">
                <el-input v-model="user.student_id" id="student_id" placeholder="请输入学号"></el-input>
                <span class="inputtip"></span>
            </el-form-item>
            <el-form-item label="关系：" style="width: 150px" v-if="user.role == 'parent'">
                <el-select v-model="user.relationship" placeholder="请选择与学生关系" class="el-select1">
                    <el-option v-for="item in optionsRelationship" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择班级：" style="width: 150px" v-if="user.role == 'student'">
                <el-select v-model="form.class_id" placeholder="请选择班级" class="el-select1">
                    <el-option v-for="item in optionsClass" :key="item.class_id" :label="item.name"
                        :value="item.class_id"></el-option>
                </el-select>
            </el-form-item>
            <div v-if="user.role == 'student'">
                <span style="position: relative; top: -30px; left: 0px">采样照片 ：</span>
                <a href="javascript:;" class="a-upload1">
                    <input type="file" accept="image/*" name="" id="file1" />
                </a>
                <a href="javascript:;" class="a-upload2">
                    <input type="file" accept="image/*" name="" id="file2" />
                </a>
                <a href="javascript:;" class="a-upload3">
                    <input type="file" accept="image/*" name="" id="file3" />
                </a>
            </div>

            <br /><br />
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitSign1()">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            optionsClass: [],
            user: JSON.parse(localStorage.getItem("userinfo")),
            student: JSON.parse(localStorage.getItem("userinfo")),
            dialogFormVisible: false,
            form: {
                class_id: '',
                name: ''
            },
            optionsRelationship: [
                { value: '父亲', label: '父亲' },
                { value: '母亲', label: '母亲' },
                { value: '兄弟姐妹', label: '兄弟姐妹' },
                { value: '朋友', label: '朋友' },
                { value: '其他', label: '其他' }
            ]
        };
    },
    created() {
        if (this.student.class_id) {
            this.request.get("/classes?class_id=" + this.student.class_id).then(res => {
                if (res.data) {
                    this.form.name = res.data.name
                    this.form.class_id = res.data.class_id
                }
            })
        }
        this.request.get("/classes").then(res => {
            if (res.data) {
                this.optionsClass = res.data;
            }
        })
    },
    methods: {
        submitSign1() {
            this.request.post('/updateInfo', this.user).then(response => {
                if (response.success) {
                    localStorage.setItem("userinfo", JSON.stringify(this.user))
                    this.$message.warning('信息更新成功');
                } else {
                    this.$message.error('信息更新失败');
                }
            }).catch(error => {
                this.$message.error('信息更新失败');
            });
        },
        jl1() {
            // Handle class change
        },
    },
};
</script>

<style scoped>
.inputtip {
    color: #ccc;
    padding-left: 20px;
    font-size: 10px;
    width: 100%;
    display: inline-block;
    line-height: 13px;
    text-align: left;
    top: 5px;
    position: relative;
}

.a-upload1,
.a-upload2,
.a-upload3 {
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

.a-upload1 input,
.a-upload2 input,
.a-upload3 input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

.a-upload1:hover,
.a-upload2:hover,
.a-upload3:hover {
    text-decoration: none;
    opacity: 0.6;
}

.el-select1 {
    margin-left: 20px;
}
</style>