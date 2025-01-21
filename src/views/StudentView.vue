<template>
    <div class="xsst">
        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%">
                <el-row :gutter="20">
                    <el-col :span="6" style="width: 22%">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                  font-size: 20px;

                  padding-left: 5px;
                "><strong>&nbsp;&nbsp;&nbsp;&nbsp;学生视图</strong></span>
                        </div>
                    </el-col>
                    <el-col :span="18" v-if="role == 'teacher'">
                        <div class="grid-content bg-purple-light" style="text-align: right">
                            <el-form :model="form" :inline="true" class="demo-form-inline el-row1">
                                <el-form-item label="选择班级：">
                                    <el-select v-model="form.class" placeholder="请选择班级" @change="changeClass"
                                        class="el-select1">
                                        <el-option v-for="item in optionsClass" :key="item.class_id" :label="item.name"
                                            :value="item.class_id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择学生：">
                                    <el-select clearable v-model="form.student" placeholder="学生" @change="changeStudent"
                                        class="el-select3">
                                        <el-option v-for="item in optionsStudent" :key="item.student_id"
                                            :label="item.name" :value="item.student_id">
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
        <el-card class="box-card showmain">
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left; height: 60px">
                    <h4 style="
              text-align: left;
              margin-top: -10px;
              margin-left: 0px;
              line-height: 20px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                        学生概览
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="padding: 20px 10px; box-sizing: border-box" class="el-rowshow3">
                <el-col :span="8" class="studentStyle">
                    <div id="J_prismPlayer" style="height: 170px; width: 227px">
                        <!-- <video
              id="videoElement"
              autoplay
              muted
              controls
              style="width: 100%; height: 100%"
            >
              <source />
              不支持video
            </video> -->
                    </div>
                </el-col>
                <el-col :span="16" class="studentStyle">
                    <h3 style="
              text-align: left;
              margin-top: 11px;
              margin-left: 0px;
              height: 22px;
            ">
                        学生信息
                    </h3>
                    <div style="height: 200px">
                        <p style="margin-top: -1px">班级名称:{{ currentClass.name }}</p>
                        <p>学生名称:{{ currentStudent.name }}</p>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left; height: 60px">
                    <h4 style="
              text-align: left;
              margin-top: -1px;
              margin-left: 0px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                        得分概览
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="el-rowshow" style="padding-top: 0px; height: 280px">
                <el-col :span="8">
                    <div>
                        <div class="studentStyle" id="studentParticipation" ref="studentParticipation"
                            style="height: 500px; top: -60px" v-loading="loadingBasicInfo"
                            element-loading-text="参与度识别正在加载" element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(225, 225, 225, 0)"></div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="studentStyle" id="studentConcentration" ref="studentConcentration"
                        style="height: 500px; top: -60px" v-loading="loadingBasicInfo" element-loading-text="专注度正在加载"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="studentStyle" id="studentUnderstanding" ref="studentUnderstanding"
                        style="height: 500px; top: -60px" v-loading="loadingBasicInfo" element-loading-text="理解度正在加载"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
            </el-row><br />
            <!-- 二 改 三 -->
            <el-row :gutter="24" class="" style="border-bottom: 2px solid #ccc; height: 515px">
                <el-col :span="10">
                    <div id="studentPose" ref="studentPose" style="height: 500px; top: -120px"
                        v-loading="loadingBasicInfo" element-loading-text="动作识别正在加载"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
                <el-col :span="14">
                    <div id="studentEta" ref="studentEta" style="height: 500px; top: -120px"
                        v-loading="loadingBasicInfo" element-loading-text="eta正在加载"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
            </el-row><br />
            <!--数据分析 第三行-->
            <el-row class="ssfx">
                <el-col :span="24">
                    <div class="studentStyle" id="studentStatus" ref="studentStatus"
                        style="height: 500px; margin-top: -75px" v-loading="loadingRealTimeInfo"
                        element-loading-text="实时状态正在加载" element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(225, 225, 225, 0)"></div>
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>
import * as echarts from "echarts"
import "echarts-gl"
import * as router from "../router/index"

export default {
    computed: {},
    data() {
        return {
            role: JSON.parse(localStorage.getItem("userinfo")).role,
            intervalId: null,
            optionsClass: [],
            optionsStudent: [],
            currentClass: "",
            currentStudent: "",
            form: {
                class: "CL001",
                student: "",
            },
            formname: {
                class: "电子商务",
                group: "第一组",
                student: "谢万超",
            },
            loadingBasicInfo: true,
            loadingRealTimeInfo: true,
            playerOrNot: 0,
            concentrationNum: 0,
            participationNum: 0,
            understandingNum: 0,
            // pose
            poseNums: [0, 0, 0, 0, 0],
            // status
            timeData: [new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0')],
            boringData: [0],
            confusionData: [0],
            frustrationData: [0],
            delightedData: [0],
            participationData: [0],
        };
    },

    activated() {
        console.log("role", this.role)
        this.utils.vedio(this, "http://124.222.217.145:8090/live/" + 154 + ".flv")
        this.loadingBasicInfo = false

        this.echartsStudentParticipationConcentrationUnderstanding("studentParticipation", this.participationNum, "参与度", "#666")
        this.echartsStudentParticipationConcentrationUnderstanding("studentConcentration", this.concentrationNum, "专注度", "#38C3A1")
        this.echartsStudentParticipationConcentrationUnderstanding("studentUnderstanding", this.understandingNum, "理解度", "#666")

        // this.request.get("/student_scores").then(res => {
        //     this.participationNum = res.participationNum;
        //     this.concentrationNum = res.concentrationNum;
        //     this.understandingNum = res.understandingNum;
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentParticipation", this.participationNum, "参与度", "#666")
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentConcentration", this.concentrationNum, "专注度", "#38C3A1")
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentUnderstanding", this.understandingNum, "理解度", "#666")
        // });

        // setInterval(() => {
        //     this.request.get("/student_scores").then(res => {
        //         this.request.get("/student_scores").then(res => {
        //             this.participationNum = res.participationNum;
        //             this.concentrationNum = res.concentrationNum;
        //             this.understandingNum = res.understandingNum;
        //             this.echartsStudentParticipationConcentrationUnderstanding("studentParticipation", this.participationNum, "参与度", "#666")
        //             this.echartsStudentParticipationConcentrationUnderstanding("studentConcentration", this.concentrationNum, "专注度", "#38C3A1")
        //             this.echartsStudentParticipationConcentrationUnderstanding("studentUnderstanding", this.understandingNum, "理解度", "#666")
        //         });
        //     });
        // }, 10000); // 每隔10秒更新一次数据

        this.echartsPose()

        // this.request.get("/pose_scores").then(res => {
        //     this.poseNums = res;
        //     this.echartsPose()
        // });

        // setInterval(() => {
        //     this.request.get("/pose_scores").then(res => {
        //         this.poseNums = res;
        //         this.echartsPose()
        //     });
        // }, 10000); // 每隔10秒更新一次数据
        this.echarsEta()
        this.loadingRealTimeInfo = false

        this.echartsInteractionConcentrationStatusData();
        this.echartsStatus(); // 更新图表

        setInterval(() => {
            this.echartsInteractionConcentrationStatusData();
            this.echartsStatus(); // 更新图表
        }, 30000); // 每隔30秒更新一次数据

        // this.intervalId = setInterval(() => {
        //     this.echartsStudentParticipationConcentrationUnderstandingStatusData()
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentParticipation", this.participationNum, "参与度", "#666")
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentConcentration", this.concentrationNum, "专注度", "#38C3A1")
        //     this.echartsStudentParticipationConcentrationUnderstanding("studentUnderstanding", this.understandingNum, "理解度", "#666")
        //     this.echartsStatus()

        // }, 1000);

        this.request.get("/classes").then(res => {
            if (res.data) {
                this.optionsClass = res.data;
                this.request.get("/classes?class_id=" + this.optionsClass[0].class_id).then(res => {
                    if (res.data) {
                        this.optionsStudent = res.data.students;
                        console.log(this.optionsStudent)
                    }
                })
                this.currentClass = this.optionsClass.find(item => item.class_id === this.form.class)
            }

        })

    },

    beforeRouteLeave(to, from, next) {
        // 在离开当前路由时清除定时器
        console.log(999)
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        next();
    },

    methods: {
        formatTime(timePart) {
            return timePart < 10 ? `0${timePart}` : timePart;
        },
        changeClass() {
            this.request.get("/classes?class_id=" + this.form.class).then(res => {
                if (res.data) {
                    this.optionsStudent = res.data.students;
                    console.log(this.optionsStudent)
                }
            })
            this.currentClass = this.optionsClass.find(item => item.class_id === this.form.class)
        },
        changeStudent() {
            this.currentStudent = this.optionsStudent.find(item => item.student_id === this.form.student)
        },
        search() {
            console.log(2)
        },
        echartsStudentParticipationConcentrationUnderstanding(elementId, value, name, color) {
            var chartDom = document.getElementById(elementId);
            var myChart = echarts.init(chartDom);
            // if (value <= 0 || (!value)) {
            //     value = 0;
            // } else if (value <= 1) {
            //     value = (value * 100).toFixed(0);
            //     // console.log(value);
            // } else {
            //     value = value.toFixed(0);
            // }
            var option = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%",
                },
                color: "#38C3A1",
                series: [{
                    name: "",
                    type: "gauge",
                    progress: {
                        show: true,
                    },
                    splitLine: {
                        length: 2,
                        lineStyle: {
                            color: "#cccccc",
                            width: 3
                        },
                    },
                    axisLabel: {
                        color: "#cccccc"
                    },
                    axisTick: {
                        lineStyle: {
                            color: "#ccc"
                        },
                        length: 3,
                        width: 1
                    },
                    anchor: {
                        itemStyle: {
                            color: "#666"
                        }
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: "{value}",
                        ontSize: 28,
                    },
                    title: {
                        color: color,
                        offsetCenter: [0, 80],
                    },
                    data: [{
                        value: value,
                        name: name,
                    },],
                },],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echartsPose() {
            var chartDom = document.getElementById("studentPose");
            var myChart = echarts.init(chartDom);
            var content = ["学习", "睡觉", "举手", "玩手机", "吃喝"]
            var poseNums = this.poseNums
            var option = {
                color: ["#38C3A1", "#99FDE4", "#38C3A1", "#52EBC6", "#D5FDF3"],
                title: {
                    text: "动作识别",
                    subtext: "",
                    left: "center",
                    top: 80,
                },
                tooltip: {
                    trigger: "item",
                },
                toolbox: {
                    show: true,
                    feature: {

                    },
                },
                legend: {
                    left: "center",
                    top: "bottom",
                    data: [content[0], content[1], content[2], content[3], content[4]],
                },
                series: [{
                    name: "占比",
                    type: "pie",
                    radius: [20, 100],
                    center: ["50%", "50%"],
                    roseType: "area",
                    itemStyle: {
                        borderRadius: 5,
                    },
                    data: [{
                        value: poseNums[0],
                        name: content[0]
                    },
                    {
                        value: poseNums[1],
                        name: content[1]
                    },
                    {
                        value: poseNums[2],
                        name: content[2]
                    },
                    {
                        value: poseNums[3],
                        name: content[3]
                    },
                    {
                        value: poseNums[4],
                        name: content[4]
                    },

                    ],
                }],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echarsEta() {
            var chartDom = document.getElementById("studentEta");
            var myChart = echarts.init(chartDom);
            var hours = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
            var days = ["情感", "动作", "思考"];
            var data = [
                [1, 0, 0],
                [0, 2, 0],
                [7, 0, 0],
                [0, 0, 0],
                [0, 0, 5],
                [1, 2, 5],
                [0, 0, 4],
                [0, 9, 1],
                [0, 2, 0],
            ]
            var option = {
                title: {
                    top: 30,
                    text: "ETA三维评分",
                    x: "center",
                },
                boundaryGap: true,
                tooltip: {},
                visualMap: {
                    max: 100,
                    show: false,
                    inRange: {
                        color: [
                            "#D4F9F0",
                            "#C3F8EB",
                            "#ABEFDE",
                            "#7BD6C0",
                            "#66DABE",
                            "#52D8B7",
                            "#3FCDAA",
                            "#38C3A1",
                            "#36B9b9",
                            "#36Bff9",
                            "#36B999",
                        ],
                    },
                },
                xAxis3D: {
                    type: "category",
                    boundaryGap: false,
                    data: hours,
                },
                yAxis3D: {
                    type: "category",
                    data: days,
                },

                zAxis3D: {
                    type: "value",
                },
                grid3D: {
                    boxDepth: 30,
                    boxWidth: 100,
                    boxHeight: 50,
                    viewControl: {
                        // projection: "orthographic",
                    },
                    light: {
                        main: {
                            intensity: 1.2,
                            shadow: false,
                        },
                        ambient: {
                            intensity: 0.3,
                        },
                    },
                },
                series: [{
                    type: "bar3D",
                    // name:,
                    data: data.map(function (item) {
                        return {
                            value: [item[1], item[0], item[2]],
                        };
                    }),
                    shading: "lambert",

                    label: {
                        fontSize: 16,
                        borderWidth: 5,
                    },

                    emphasis: {
                        label: {
                            fontSize: 20,
                            color: "#00FA05",
                        },
                        itemStyle: {
                            color: "#38C3A1",
                        },
                    },
                },],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echartsStatus() {
            var chartDom = document.getElementById("studentStatus");
            var myChart = echarts.init(chartDom);
            var title = "实时状态分析"
            var content = ["无聊", "困惑", "沮丧", "愉悦"]
            var option = {

                xAxis: {
                    type: "category",
                    data: this.timeData,
                },
                yAxis: {
                    type: "value",
                },
                title: {
                    text: title,
                },
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: content,
                },
                series: [{
                    // type: "line",
                    name: content[0],
                    type: "line",
                    stack: "",
                    data: this.boringData,
                    showSymbol: false,
                    smooth: true
                },
                {
                    name: content[1],
                    type: "line",
                    stack: "",
                    data: this.confusionData,
                    showSymbol: false,
                    smooth: true
                },
                {
                    name: content[2],
                    type: "line",
                    stack: "",
                    data: this.frustrationData,
                    showSymbol: false,
                    smooth: true
                },
                {
                    name: content[3],
                    type: "line",
                    stack: "",
                    data: this.delightedData,
                    showSymbol: false,
                    smooth: true
                },
                ],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echartsInteractionConcentrationStatusData() {
            this.timeData.push(
                new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0')
            );
            this.request.get("/group_status").then(res => {
                this.boringData.push(res.boring);
                this.confusionData.push(res.confusion);
                this.frustrationData.push(res.frustration);
                this.delightedData.push(res.delighted);
                this.participationData.push(res.participation);
            });
        }
    }
}
</script>

<style scoped>
.studentStyle {
    /* border: 2px solid #dae4e7; */
    margin-top: -80px;
    text-align: left;
    font-size: 14px;
}

.el-rowshow3 {
    height: 171px;
}

.el-rowshow {
    padding-top: 55px;
    height: 310px;
    top: -15px;
}

#J_prismPlayer {
    margin-top: 1px;
    background-image: url("../assets/实时监控.png"),
        linear-gradient(135deg, #38c3a1, #c9fdf0);
    background-repeat: no-repeat;
    background-size: 50px 50px, 227px 100%;
    background-position: 50% 55%;
}
</style>
