<!--  -->
<template>
    <div class="syztbx">
        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%">
                <el-row>
                    <el-col :span="6">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                    font-size: 20px;
                    padding-left: 1px;
                  "><strong>&nbsp;&nbsp;&nbsp;&nbsp;班级整体表现</strong></span>
                        </div>
                    </el-col>
                    <!-- <el-col :span="8" class="" style="margin-top: -8px"> -->

                    <!-- <div class="block">
                <el-date-picker
                  v-model="value1"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div> -->
                    <!-- </el-col> -->
                    <!-- <el-col :span="10">
                    <div class="grid-content bg-purple-light" style="text-align: right">
                        <el-form :model="form" :inline="true" class="demo-form-inline margintop">
                            <el-form-item label="选择实验：" prop="xuexiao">
                                <el-select clearable v-model="form.xuexiao" placeholder="请选择实验">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-button size="medium" @click="search" class="margintop1">搜索</el-button>
                        </el-form>
                    </div>
                </el-col> -->
                    <el-col :span="18">
                        <div class="grid-content bg-purple-light" style="text-align: right">
                            <el-form :model="form" :inline="true" class="demo-form-inline el-row1">
                                <el-form-item>
                                    <el-date-picker v-model="value1" type="datetime" placeholder="开始时间"
                                        style="width: 200px" @change="log">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="选择班级：">
                                    <el-select v-model="form.class" placeholder="请选择班级" @change="changeClass"
                                        class="el-select1">
                                        <el-option v-for="item in optionsClass" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-button size="medium" @click="search">搜索</el-button>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </el-button-group>
        </el-card><br />
        <!--table表-->
        <el-card class="box-card showmain">
            <!--表格1-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    出勤率(基于对比)
                </h2>
                <el-table :data="tableData1" border :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <!--<el-table-column
                          align="center"
                          prop="times"
                          label="创建时间"
                          width="200"
                          :formatter="formatDate">
                  </el-table-column>-->
                    <el-table-column align="center" prop="q1" label="总人数" width="82">
                    </el-table-column>
                    <el-table-column align="center" prop="q2" label="实到人数" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="q3" label="到课率" width="82">
                    </el-table-column>
                    <el-table-column align="center" prop="q4" label="迟到人数" width="120">
                    </el-table-column>
                    <el-table-column align="center" prop="q5" label="早退人数" width="120">
                    </el-table-column>
                    <el-table-column align="center" prop="q6" label="缺勤人员" width="120">
                    </el-table-column>
                    <el-table-column align="center" prop="q7" label="迟到人员" width="120">
                    </el-table-column>
                    <el-table-column align="center" prop="q8" label="早退人员" width="120">
                    </el-table-column>
                </el-table>
            </template>
            <!--表格2-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    专注度 (专注度和睡眠识别)
                </h2>
                <el-table :data="tableData2" border :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <!--<el-table-column
                          align="center"
                          prop="times"
                          label="创建时间"
                          width="200"
                          :formatter="formatDate">
                  </el-table-column>-->
                    <el-table-column align="center" prop="q1" label="时间段" width="109">
                    </el-table-column>
                    <el-table-column align="center" prop="focus" label="专注度" width="70">
                    </el-table-column>
                    <el-table-column align="center" prop="people" label="专注人数" width="80">
                    </el-table-column>
                    <el-table-column align="center" prop="Sleep" label="睡觉人数" width="80">
                    </el-table-column>
                    <el-table-column align="center" prop="EatDrink" label="喝水人数" width="80">
                    </el-table-column>
                    <el-table-column align="center" prop="Phone" label="玩手机人数" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="Rehand" label="举手人数" width="75">
                    </el-table-column>
                    <el-table-column align="center" prop="Calling" label="打电话人数" width="95">
                    </el-table-column>
                    <el-table-column align="center" prop="Study" label="学习人数" width="75">
                    </el-table-column>
                    <el-table-column align="center" prop="onScore" label="综合专注度" width="100">
                    </el-table-column>
                </el-table>
            </template>
            <!--表格3-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    互动度(基于表情和互动度识别)
                </h2>
                <el-table :data="tableData3" border :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <!--<el-table-column
                          align="center"
                          prop="times"
                          label="创建时间"
                          width="200"
                          :formatter="formatDate">
                  </el-table-column>-->
                    <el-table-column align="center" prop="q1" label="时间段" width="109">
                    </el-table-column>
                    <!-- <el-table-column
              align="center"
              prop="q2"
              label="提问人次"
              width="130"
            >
            </el-table-column> -->
                    <el-table-column align="center" prop="Boredom_Monologue" label="独白/无聊" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="Discussion_Dialogue" label="对话/讨论" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="Confusion" label="困惑" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="Frustration" label="沮丧" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="Delight" label="愉悦" width="100">
                    </el-table-column>
                    <!-- <el-table-column
              align="center"
              prop="Engagement"
              label="参与"
              width="160"

            </el-table-column>
            > -->
                    <el-table-column align="center" prop="Silence" label="安静" width="100">
                    </el-table-column>
                    <el-table-column align="center" prop="focus" label="综合互动度" width="155">
                    </el-table-column>
                </el-table>
            </template>
            <!--4-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    理解度(基于情绪识别和知识图谱)
                </h2>
                <el-table :data="tableData4" border :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <!--<el-table-column
                          align="center"
                          prop="times"
                          label="创建时间"
                          width="200"
                          :formatter="formatDate">
                  </el-table-column>-->
                    <el-table-column align="center" prop="q1" label="时间段" width="160">
                    </el-table-column>
                    <el-table-column align="center" prop="q2" label="无聊人次" width="82">
                    </el-table-column>
                    <el-table-column align="center" prop="q3" label="沮丧困扰人次" width="130">
                    </el-table-column>
                    <el-table-column align="center" prop="q4" label="愉悦人次" width="82">
                    </el-table-column>
                    <el-table-column align="center" prop="q5" label="知识掌握度画像" width="160">
                    </el-table-column>
                    <el-table-column align="center" prop="q6" label="提问人次" width="125">
                    </el-table-column>
                    <el-table-column align="center" prop="q7" label="综合理解度" width="125">
                    </el-table-column>
                </el-table>
            </template>
            <!--5-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    学生综合排名
                </h2>
                <el-table :data="tableData5" border :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <!--<el-table-column
                          align="center"
                          prop="times"
                          label="创建时间"
                          width="200"
                          :formatter="formatDate">
                  </el-table-column>-->
                    <el-table-column align="center" prop="q1" label="参与度排名" width="114">
                    </el-table-column>
                    <el-table-column align="center" prop="q2" label="姓名" width="110">
                    </el-table-column>
                    <el-table-column align="center" prop="q3" label="理解度排名" width="160">
                    </el-table-column>
                    <el-table-column align="center" prop="q4" label="姓名" width="130">
                    </el-table-column>
                    <el-table-column align="center" prop="q5" label="认真度排名" width="150">
                    </el-table-column>
                    <el-table-column align="center" prop="q6" label="姓名" width="200">
                    </el-table-column>
                </el-table>
            </template>
            <!--6-->
            <template>
                <h2 style="
              color: #333;
              text-align: left;
              font-size: 16px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                    学生表现明细
                </h2>
                <el-table :data="tableData6" :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
                    style="width: 100%">
                    <el-table-column type="index" width="50" align="center">
                    </el-table-column>
                    <el-table-column prop="q1" label="学号" width="110" align="center">
                    </el-table-column>
                    <el-table-column prop="q2" label="姓名" width="75" align="center">
                    </el-table-column>
                    <el-table-column prop="q3" label="参与度" width="69" align="center">
                    </el-table-column>
                    <el-table-column prop="q4" label="理解度" width="70" align="center">
                    </el-table-column>
                    <el-table-column prop="q5" label="认真值" width="70" align="center">
                    </el-table-column>
                    <el-table-column label="互动情况">
                        <el-table-column prop="q6" label="安静" width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="q7" label="独白" width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="q8" label="对话" width="50" align="center">
                        </el-table-column>
                        <el-table-column prop="q9" label="讨论" width="50" align="center">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="eta三维">
                        <el-table-column prop="q10" label="emotion" width="90" align="center">
                        </el-table-column>
                        <el-table-column prop="q11" label="thinking" width="90" align="center">
                        </el-table-column>
                        <el-table-column prop="q12" label="action" width="90" align="center">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </template>
        </el-card>
    </div>
</template>


<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象components中才能使用
    components: {},
    data() {
        return {
            optionsClass: [
                { value: 154, label: "电子商务" },
                { value: 155, label: "信息工程" },
                { value: 156, label: "软件工程" },
                { value: 157, label: "网络空间安全" },
            ],
            value1: "",
            options: [],
            tableData1: [{
                q1: "10",
                q2: "1",
                q3: "10%",
                q4: "9",
                q5: "...",
                q6: "...",
                q7: "...",
                q8: "...",
            },],
            tableData2: [{
                q1: "第一个15分钟",
                Calling: 0,
                EatDrink: 0,
                Phone: 0,
                Rehand: 0,
                Sleep: 0,
                Study: 0,
                Time: 0,
                focus: ">70%",
                onScore: 0,
                people: 0,
                sLevel: 0,
                onScore: 0,
            },
            {
                q1: "第二个15分钟",
                Calling: 0,
                EatDrink: 0,
                Phone: 0,
                Rehand: 0,
                Sleep: 0,
                Study: 0,
                Time: 0,
                focus: ">70%",
                onScore: 0,
                people: 0,
                sLevel: 0,
                onScore: 0,
            },
            {
                q1: "第三个15分钟",
                Calling: 0,
                EatDrink: 0,
                Phone: 0,
                Rehand: 0,
                Sleep: 0,
                Study: 0,
                Time: 0,
                focus: ">70%",
                onScore: 0,
                people: 0,
                sLevel: 0,
                onScore: 0,
            },
            {
                q1: "第四个15分钟",
                Calling: 0,
                EatDrink: 0,
                Phone: 0,
                Rehand: 0,
                Sleep: 0,
                Study: 0,
                Time: 0,
                focus: ">70%",
                onScore: 0,
                people: 0,
                sLevel: 0,
                onScore: 0,
            },
            ],
            tableData3: [{
                q1: "第一个15分钟",
                Boredom_Monologue: 0,
                Confusion: 0,
                Delight: 0,
                // Dialogue: 0,
                Discussion_Dialogue: 0,
                Engagement: 0,
                Frustration: 0,
                // Monologue: 0,
                Silence: 0,
                Time: "2021-06-25 11:0",
                focus: 0,
                sLevel: 1,
            },
            {
                q1: "第二个15分钟",
                Boredom_Monologue: 0,
                Confusion: 0,
                Delight: 0,
                // Dialogue: 0,
                Discussion_Dialogue: 0,
                Engagement: 0,
                Frustration: 0,
                // Monologue: 0,
                Silence: 0,
                Time: "2021-06-25 11:0",
                focus: 0,
                sLevel: 1,
            },
            {
                q1: "第三个15分钟",
                Boredom_Monologue: 0,
                Confusion: 0,
                Delight: 0,
                // Dialogue: 0,
                Discussion_Dialogue: 0,
                Engagement: 0,
                Frustration: 0,
                // Monologue: 0,
                Silence: 0,
                Time: "2021-06-25 11:0",
                focus: 0,
                sLevel: 1,
            },
            {
                q1: "第四个15分钟",
                Boredom_Monologue: 0,
                Confusion: 0,
                Delight: 0,
                // Dialogue: 0,
                Discussion_Dialogue: 0,
                Engagement: 0,
                Frustration: 0,
                // Monologue: 0,
                Silence: 0,
                Time: "2021-06-25 11:0",
                focus: 0,
                sLevel: 1,
            },
            ],
            tableData4: [{
                q1: "第一个15分钟",
                q2: "0",
                q3: "0",
                q4: "0",
                q5: "0",
                q6: "0",
                q7: "0%",
            },
            {
                q1: "第二个15分钟",
                q2: "0",
                q3: "0",
                q4: "0",
                q5: "0",
                q6: "0",
                q7: "0%",
            },
            {
                q1: "第三个15分钟",
                q2: "0",
                q3: "0",
                q4: "0",
                q5: "0",
                q6: "0",
                q7: "0%",
            },
            {
                q1: "第四个15分钟",
                q2: "0",
                q3: "0",
                q4: "0",
                q5: "0",
                q6: "0",
                q7: "0%",
            },
            ],
            tableData5: [{
                q1: "1",
                q2: "谢万超",
                q3: "1",
                q4: "谢万超",
                q5: "1",
                q6: "谢万超",
            },
                // {
                //     q1: "2",
                //     q2: "孙翎尧",
                //     q3: "2",
                //     q4: "陈汝君",
                //     q5: "2",
                //     q6: "孙翎尧",
                // },
            ],
            tableData6: [{
                q1: "20212010111",
                q2: "谢万超",
                q3: "53.67",
                q4: "67.45",
                q5: "78.23",
                q6: "0.34",
                q7: "0.23",
                q8: "0.04",
                q9: "0.54",
                q10: "45",
                q11: "37.16",
                q12: "17.84",
            },
                // {
                //     q1: "20212010112",
                //     q2: "刁凯歌",
                //     q3: "62.10",
                //     q4: "63.25",
                //     q5: "75.61",
                //     q6: "0.41",
                //     q7: "0.17",
                //     q8: "0.08",
                //     q9: "0.62",
                //     q10: "39",
                //     q11: "41.55",
                //     q12: "16.48",
                // },
                // {
                //     q1: "20212010113",
                //     q2: "孙翎尧",
                //     q3: "50.32",
                //     q4: "65.18",
                //     q5: "76.13",
                //     q6: "0.42",
                //     q7: "0.17",
                //     q8: "0.06",
                //     q9: "0.47",
                //     q10: "52",
                //     q11: "39.16",
                //     q12: "18.64",
                // },
                // {
                //     q1: "20212010114",
                //     q2: "杨安东",
                //     q3: "47.13",
                //     q4: "59.61",
                //     q5: "71.75",
                //     q6: "0.39",
                //     q7: "0.27",
                //     q8: "0.06",
                //     q9: "0.57",
                //     q10: "46",
                //     q11: "39.23",
                //     q12: "16.37",
                // },
            ],
            form: {
                xuexiao: "",
            },
            selectTime: "",
            titleColor: "#ccccccc",
        };
    },

    //初始化

    methods: {
        log(m, n, x) {
            console.log(m);
            // console.log(n);
            // console.log(x);
            this.selectTime =
                this.value1.getFullYear() +
                "-" +
                (this.value1.getMonth() + 1 < 10 ?
                    "0" + (this.value1.getMonth() + 1) :
                    this.value1.getMonth() + 1) +
                "-" +
                (this.value1.getDate() < 10 ?
                    "0" + this.value1.getDate() :
                    this.value1.getDate()) +
                // "-" +
                // this.value1.getDate() +
                " " +
                (this.value1.getHours() < 10 ?
                    "0" + this.value1.getHours() :
                    this.value1.getHours()) +
                // this.value1.getHours() +
                ":" +
                (this.value1.getMinutes() < 10 ?
                    "0" + this.value1.getMinutes() :
                    this.value1.getMinutes()) +
                // this.value1.getMinutes() +
                ":" +
                (this.value1.getSeconds() < 10 ?
                    "0" + this.value1.getSeconds() :
                    this.value1.getSeconds());
            // this.value1.getSeconds();
            console.log(this.selectTime);
        },
        search() {

        }

    },
};
</script>

<style scoped>
.margintop {
    margin-top: -10px !important;
}

.margintop1 {
    margin-top: 2px;
}
</style>
