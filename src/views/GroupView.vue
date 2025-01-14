<template>
    <div class="groupst">
        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%">
                <el-row :span="20">
                    <el-col :span="3">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                  font-size: 20px;

                  padding-left: 5px;
                "><strong>&nbsp;&nbsp;&nbsp;&nbsp;小组视图</strong></span>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="grid-content bg-purple-light" style="text-align: right">
                            <el-form :model="form" :inline="true" class="demo-form-inline el-row1">
                                <el-form-item label="选择班级：">
                                    <el-select v-model="form.class" placeholder="请选择班级" @change="changeClass"
                                        class="el-select1">
                                        <el-option v-for="item in optionsClass" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="选择小组：">
                                    <el-select clearable v-model="form.group" placeholder="请选择小组" class="el-select2">
                                        <el-option v-for="item in optionsGroup" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-button size="medium" style="margin-top: 0px" @click="search">搜索</el-button>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </el-button-group>
        </el-card><br />
        <div class="el-maintop"></div>
        <el-card class="box-card showmain2 margintop">
            <el-row :gutter="24" style="box-sizing: border-box; margin-bottom: -40px">
                <el-col :span="24" class="" style="height: 81px">
                    <h4 style="
              text-align: left;
              line-height: 20px;
              margin-top: 40px;
              margin-bottom: -100p;
              border-left: 5px solid #38c3a1;
              padding-left: 5px; 
            ">
                        小组概览
                    </h4>
                </el-col>
            </el-row>
            <!--数据分析 第一行-->

            <el-row :gutter="24" style="padding: 0px 10px; box-sizing: border-box; height: 240px" class="el-rowshow3">
                <el-col :span="8" class="">
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
                <el-col :span="16" class="">
                    <h3 style="
              text-align: left;
              margin-top: 10px;
              margin-left: 0px;
              font-size: 16px;
            ">
                        小组信息
                    </h3>
                    <div style="
              height: 200px;
              margin-left: 0px;
              margin-top: 10px;
              font-size: 14px;
              text-align: left;
            ">

                        <p>院系名称:{{ "计算机科学技术学院" }}</p>
                        <p>班级名称:{{ "电子商务" }}</p>
                        <p>小组名称:{{ "第一组" }}</p>
                        <p>小组人数:{{ "10" }}</p>
                    </div>
                </el-col>

            </el-row><br />
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left; height: 0px">
                    <h4 style="
              text-align: left;
              margin-top: -1px;
              margin-left: 0px;
              border-left: 5px solid #38c3a1;
              padding-left: 5px;
            ">
                        小组成员
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="
          padding: -80px 10px;
          box-sizing: border-box;
          height: 100%;
          padding-bottom: 30px;
        " class="el-rowshow3">
                <el-col :span="24" style="height: 100%; margin-top: 0px" class="">
                    <!--表格1-->
                    <template>
                        <el-table :data="tableData" border
                            :header-cell-style="{ background: '#eef1f6', color: '#606266' }" style="width: 100%">
                            <el-table-column type="index" width="50" align="center" label="序号">
                            </el-table-column>
                            <el-table-column align="center" prop="q1" label="角色" width="210">
                            </el-table-column>
                            <el-table-column align="center" prop="q2" label="学号" width="210">
                                <template slot-scope="scope">
                                    {{ scope.row.q2 }}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="q3" label="姓名" width="224">
                            </el-table-column>
                            <el-table-column align="center" prop="q4" label="年龄" width="220">
                            </el-table-column>
                        </el-table>
                    </template> </el-col>
            </el-row><br />
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left">
                    <h4 style="
              text-align: left;
              margin-top: 2px;
              margin-left: 0px;
              border-left: 5px solid #38c3a1;
              padding-left: 2px;
            ">
                        小组情况
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="el-rowshowonly">
                <el-col :span="8" :offset="2">
                    <div class="" id="interaction" style="height: 500px; top: -100px" v-loading="loadingData"
                        element-loading-text="小组互动情况正在加载" element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(225, 225, 225, 0)"></div>
                </el-col>
                <el-col :span="8" :offset="4" style="">
                    <div class="" id="concentration" ref="concentration" style="height: 500px; top: -100px"
                        v-loading="loadingData" element-loading-text="小组专注度正在加载"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
            </el-row><br />
            <!--数据分析 第二行-->
            <!--数据分析 第三行-->
            <el-row>
                <el-col>
                    <div class="" id="status" name="status" ref="status" style="height: 500px; margin-top: -130px">
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import * as echarts from "echarts"

export default {
    computed: {},
    data() {
        return {
            intervalId: null,
            tableData: [{
                q1: "组长",
                q2: "04677",
                q3: "李老师",
                q4: "--",
            },
            {
                q1: "成员",
                q2: "18110240013",
                q3: "吴斌",
                q4: "28",
            },
            {
                q1: "成员",
                q2: "19110240026",
                q3: "赵一飞",
                q4: "28",
            },
            {
                q1: "成员",
                q2: "20212010031",
                q3: "王帅宇",
                q4: "24",
            },
            {
                q1: "成员",
                q2: "20210240125",
                q3: "姚鑫玉",
                q4: "26",
            },
            {
                q1: "成员",
                q2: "21210240113",
                q3: "包智超",
                q4: "26",
            },
            {
                q1: "成员",
                q2: "21210240340",
                q3: "王朔",
                q4: "25",
            },
            {
                q1: "成员",
                q2: "22210240271",
                q3: "苏永甫",
                q4: "25",
            },
            {
                q1: "成员",
                q2: "22210240325",
                q3: "谢万超",
                q4: "25",
            },
            {
                q1: "成员",
                q2: "22210240335",
                q3: "徐铮",
                q4: "26",
            },
            ],
            optionsGroup: [
                { value: 1, label: "第一组" },
                { value: 2, label: "第二组" },
                { value: 3, label: "第三组" },
                { value: 4, label: "第四组" },
                { value: 5, label: "第五组" },
                { value: 6, label: "第六组" },
                { value: 7, label: "第七组" },
                { value: 8, label: "第八组" },
            ],
            optionsClass: [
                { value: 154, label: "电子商务" },
                { value: 155, label: "信息工程" },
                { value: 156, label: "软件工程" },
                { value: 157, label: "网络空间安全" },
            ],
            form: {
                student: 49,
                class: 154,
                group: 1,
            },
            formname: {
                student: "",
                class: "",
                group: "",
            },
            loadingData: true,
            playerOrNot: 0,
            // 安静 独白 对话 讨论
            interactionData: [5, 11, 7, 4],
            // 专注度
            concentrationData: 88,
            timeData: [new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0')],
            boringData: [0],
            confusionData: [0],
            frustrationData: [0],
            delightedData: [0],
            participationData: [0]
        };
    },
    mounted() {
        this.request.get("/interaction").then(res => {
            this.interactionData = res;
            this.echartsInteraction(); // 更新图表
        });

        setInterval(() => {
            this.request.get("/interaction").then(res => {
                this.interactionData = res;
                this.echartsInteraction(); // 更新图表
            });
        }, 10000); // 每隔10秒更新一次数据

        this.request.get("/focus").then(res => {
            this.concentrationData = res;
            this.echartsConcentration(); // 更新图表
        });

        setInterval(() => {
            this.request.get("/focus").then(res => {
                this.concentrationData = res;
                this.echartsConcentration(); // 更新图表
            });
        }, 10000); // 每隔10秒更新一次数据

        this.echartsInteractionConcentrationStatusData();
        this.echartsStatus(); // 更新图表
        
        setInterval(() => {
            this.echartsInteractionConcentrationStatusData();
            this.echartsStatus(); // 更新图表
        }, 30000); // 每隔30秒更新一次数据
    },
    activated() {
        this.utils.vedio(this, "http://124.222.217.145:8090/live/" + 154 + ".flv")
        this.loadingData = false;
        this.echartsInteraction()
        this.echartsConcentration()
        this.echartsStatus()
        // this.intervalId = setInterval(() => {
        //     this.echartsInteractionConcentrationStatusData()
        //     this.echartsInteraction()
        //     this.echartsConcentration()
        //     this.echartsStatus()

        // }, 2000)
    },
    beforeRouteLeave(to, from, next) {
        // 在离开当前路由时清除定时器
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
            console.log(1)
        },
        search() {
            console.log(2)
        },
        echartsInteraction() {
            var chartDom = document.getElementById("interaction");
            var myChart = echarts.init(chartDom);
            var content = ["安静", "独白", "对话", "讨论"]
            var option = {
                color: ["#38C3A1", "#99FDE4", "#38C3A1", "#52EBC6", "#D5FDF3", "#99FDE4"],
                title: {
                    text: "小组互动情况",
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
                        value: this.interactionData[0],
                        name: content[0]
                    },
                    {
                        value: this.interactionData[1],
                        name: content[1]
                    },
                    {
                        value: this.interactionData[2],
                        name: content[2]
                    },
                    {
                        value: this.interactionData[3],
                        name: content[3]
                    }
                    ],
                }],
            };
            myChart.setOption(option)

            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echartsConcentration() {
            var chartDom = document.getElementById("concentration");
            var myChart = echarts.init(chartDom);
            var name = "专注度"
            var color = "#38C3A1"
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
                        value: this.concentrationData,
                        name: name,
                    },],
                },],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        },
        echartsStatus() {
            var chartDom = document.getElementById("status");
            var myChart = echarts.init(chartDom);
            var title = "实时状态分析"
            var content = ["无聊", "困惑", "沮丧", "愉悦", "参与"]

            var option = {
                visualMap: [{
                    show: false,
                    type: "continuous",
                    seriesIndex: 0,
                    min: 0,
                    max: 0.4,
                    target: {
                        inRange: {
                            color: ["#f6efa6", "#d88273", "#bf444c"]
                        }
                    },
                },
                {
                    show: false,
                    type: "continuous",
                    seriesIndex: 1,
                    min: 0,
                    max: 0.4,
                    target: {
                        inRange: {
                            color: ["#ccc", "#666", "#000"]
                        }
                    },
                },
                {
                    show: false,
                    type: "continuous",
                    seriesIndex: 2,
                    min: 0,
                    max: 0.4,
                    target: {
                        inRange: {
                            color: ["#e8fdf0", "#a1edda", "#49d0b3"]
                        }
                    },
                },
                {
                    show: false,
                    type: "continuous",
                    seriesIndex: 3,
                    min: 0,
                    max: 0.4,
                    target: {
                        inRange: {
                            color: ["#e8bb8e", "#eaad71", "#e39343"]
                        }
                    },
                },
                {
                    show: false,
                    type: "continuous",
                    seriesIndex: 4,
                    min: 0,
                    max: 0.4,
                },
                {
                    show: false,
                    type: "continuous",
                    seriesIndex: 5,
                    min: 0,
                    max: 0.4,
                },
                ],
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
                    color: "#bf444c",
                },
                {
                    name: content[1],
                    type: "line",
                    stack: "",
                    data: this.confusionData,
                    showSymbol: false,
                    color: "#000",
                },
                {
                    name: content[2],
                    type: "line",
                    stack: "",
                    data: this.frustrationData,
                    showSymbol: false,
                    color: "#59d0b3",
                },
                {
                    name: content[3],
                    type: "line",
                    stack: "",
                    data: this.delightedData,
                    showSymbol: false,
                    color: "#e8bb8e",
                },
                {
                    name: content[4],
                    type: "line",
                    stack: "",
                    data: this.participationData,
                    showSymbol: false,
                    color: "#e8bb8e",
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
.sty {
    border: 2px solid #dae4e7;
}

.el-main1 {
    /* margin-top: 260px !important; */
}

/* .searchnav {
  position: fixed;
  top: 80px;
  z-index: 99;
  margin-left: -7px;
  width: 51%;
} */
.el-maintop {
    /* margin-bottom: 60px; */
}

.el-rowshowonly {
    height: 330px;
    border-bottom: 2px solid #ccc;
}

.margintop {
    margin-top: -50px;
}

.el-row1 {
    margin-left: 33px;
}

#J_prismPlayer {
    background-image: url("../assets/实时监控.png"),
        linear-gradient(135deg, #38c3a1, #c9fdf0);
    background-repeat: no-repeat;
    background-size: 50px 50px, 100% 100%;
    background-position: 50% 55%;
}
</style>
