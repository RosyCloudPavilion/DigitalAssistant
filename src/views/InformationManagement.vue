<!--  -->
<template>
<div class="studentlists">
    <el-card class="box-card searchnav" style="
        box-shadow: 0 0px 0px 0 rgb(0 0 0 / 10%);
        border-bottom: 0px;
        border-left: 0px;
        border-right: 0px;
        margin-left: -10px;
        width: 975px;
        z-index: 0;
      ">
        <el-button-group style="width: 100%">
            <el-row :gutter="20">
                <el-col :span="6" style="width: 22%">
                    <div class="grid-content bg-purple" style="text-align: left">
                        <span style="
                  font-size: 20px;

                  padding-left: 5px;
                "><strong>&nbsp;&nbsp;&nbsp;&nbsp;信息管理</strong></span>
                    </div>
                </el-col>
                <el-col :span="18"  style="width: 78%">
                    <div class="grid-content bg-purple-light" style="text-align: right; margin-top: -8px">
                        <el-select v-model="class_id" filterable placeholder="请选择班级" @change="changeClass" style="width: 200px">
                            <el-option v-for="item in optionsClass" :key="item.class_id" :label="item.name" :value="item.class_id">
                            </el-option>
                        </el-select>

                    </div>
                </el-col>
            </el-row>
        </el-button-group>
    </el-card><br />
    <router-view></router-view>
</div>
</template>

<script>
export default {

    components: {},
    data() {
        //这里存放数据
        return {
            class_id: "",
            optionsClass: [],
        };
    },
    created(){
        this.request.get("/classes").then(res => {
            if (res.data) {
                this.optionsClass = res.data;
            }
        })
    },
    methods: {
        changeClass() {
            console.log(this.class_id);
        },
    }
}
</script>

<style scoped>
.el-popover {
    top: 200px !important;
    height: 600px !important;
    /* overflow: hidden; */
    /* overflow-y: scroll; */
}
</style>
