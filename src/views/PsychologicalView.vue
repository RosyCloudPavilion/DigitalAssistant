<template>
    <div class="xlst">
        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%; height: 62px">
                <el-row :gutter="20">
                    <el-col :span="6" style="width: 22%">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                    font-size: 20px;

                    padding-left: 5px;
                  "><strong>&nbsp;&nbsp;&nbsp;&nbsp;心理视图</strong></span>
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
                <el-col :span="24" class="">
                    <h4 style="
                text-align: left;
                line-height: 20px;
                margin-top: -10px;
                margin-bottom: 35px;
                border-left: 5px solid #38c3a1;
                padding-left: 2px;
              ">
                        个人心理状态
                    </h4>
                </el-col>
            </el-row>
            <!-- 视频 -->
            <el-row :gutter="24" style="padding: 60px 10px; box-sizing: border-box" class="el-rowshow3">
                <el-col :span="8" class="sty">
                    <!-- <h3 style="text-align:left；width: 472px">影像资料</h3> -->
                    <div id="J_prismPlayer" style="height: 170px; width: 227px">

                    </div>
                </el-col>

                <!-- </el-table> -->
                <el-col :span="16" class="sty">
                    <h3 style="text-align: left; margin-top: 10px; margin-left: 0px">
                        学生信息
                    </h3>
                    <div style="height: 200px">
                        <p>班级名称:{{ currentClass.name }}</p>
                        <p>学生名称:{{ currentStudent.name }}</p>
                    </div>
                    <!-- <el-button
              type="text"
              @click="open"
              style="position: absolute; top: 0px; right: 200px; width: 200px"
              id="weibo"
              >{{ weiboText }}</el-button
            > -->

                    <el-input v-model="weiboID" type="textarea" autosize v-if="needinput" placeholder="请输入微博id"
                        @blur="weiboblur" @keyup.enter.native="weiboblur" :v-focus="true" class="weiboID z11111"
                        :readonly="editable" style="
                position: absolute;
                top: -5px;
                right: 130px;
                width: 240px;
                z-index: 999;
              "></el-input>
                    <el-input v-else v-model="weiboText" type="textarea" :v-focus="true" @dblclick.native="dblweibo"
                        class="weiboID" :readonly="editable" autosize
                        style="position: absolute; top: -5px; right: 130px; width: 240px"></el-input>
                    <p style="
                position: absolute;
                top: -57px;
                right: 300px;
                font-size: 16px;
              ">
                        微博信息
                    </p>
                </el-col>
            </el-row><br />
            <!--数据分析 第一行-->
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left">
                    <h4 style="
                text-align: left;
                margin-top: -8px;
                margin-left: 0px;
                border-left: 5px solid #38c3a1;
                padding-left: 2px;
              ">
                        心理状态
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="padding: 0 10px; box-sizing: border-box; border: 0"
                class="el-rowshow el-rowshow1">
                <el-col :span="8">
                    <div class="tendenciesDialog">
                        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="80px"
                            class="demo-ruleForm">
                            <p>今天心情怎么样啊</p>
                            <el-form-item label="文本:" class="xinqshuru" align="center" prop="age"
                                :rules="[{ required: true, message: '内容不能为空' }]">&nbsp;&nbsp;&nbsp;
                                <el-input v-model="numberValidateForm.age" style="margin-left: 5px; border: 0px"
                                    autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button round style="
                      margin-left: -90px;
                      padding: 0px;
                      backgound-color: #fff;
                      color: #000;
                      border: 0px;
                      position: absolute;
                      top: -113px;
                      right: 10px;
                      font-size: 10px;
                    " @click="submitForm('numberValidateForm', '.tendenciesDialog')">点击这里关闭</el-button>
                                <!-- <el-button @click="resetForm('numberValidateForm')" -->
                                <!-- >重置</el-button
                  > -->
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="sty el-rowshow2" id="depressedTendencies" ref="depressedTendencies"
                        style="height: 500px; top: -10px" v-loading="loadingTendenies" element-loading-text="学生抑郁倾向加载中"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
                <!-- </el-table> -->
                <el-col :span="8">
                    <div class="warningDialog">
                        <!-- <el-form
                :model="numberValidateForm"
                ref="numberValidateForm2"
                label-width="80px"
                class="demo-ruleForm demo-ruleForm2"
              >-->
                        <p>心理健康得分依据</p>
                        <table class="yjtab">
                            <tbody>
                                <tr>
                                    <td>指标</td>
                                    <td>部分采集数据</td>
                                    <td>分值</td>
                                </tr>
                                <tr>
                                    <td>视频</td>
                                    <td>
                                        <!-- <span @click="audioSrc1">用例演示1</span
                      ><span @click="audioSrc2">用例演示2</span> -->
                                    </td>
                                    <!-- kkkk-->
                                    <td>{{ videoFen }}</td>
                                </tr>
                                <tr>
                                    <td>文本</td>
                                    <td style="
                        padding-right: 30px;
                        padding-left: 30px;
                        font-size: 14px;
                      ">
                                        {{ numberValidateForm.age }}
                                    </td>
                                    <td>{{ textFen }}</td>
                                </tr>
                                <tr>
                                    <td>语音</td>
                                    <td>
                                        <audio class="audioS" :src="audiowav" controls
                                            style="width: 100%; height: 20px; margin-top: 1px"
                                            v-if="audionum == 1"></audio>
                                        <audio class="audioS" src="../assets/audio/test.wav" controls
                                            style="width: 100%; height: 20px; margin-top: 1px"
                                            v-if="audionum == 2"></audio>
                                        <audio class="audioS" src="../assets/audio/test1.wav" controls
                                            style="width: 100%; height: 20px; margin-top: 1px"
                                            v-if="audionum == 3"></audio>
                                    </td>
                                    <td>{{ audioFen }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <el-button style="
                  margin-left: -90px;
                  padding: 0px;
                  backgound-color: #fff;
                  color: #000;
                  border: 0px;
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  font-size: 10px;
                  z-index: 1000;
                " @click="submitForm('numberValidateForm2', '.warningDialog')">点击这里关闭</el-button>
                    </div>
                    <div class="sty" id="depressedWarning" ref="depressedWarning" style="height: 500px"
                        v-loading="loadingTendenies" element-loading-text="抑郁预警加载中"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225,0 )">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="sty" id="paranoidTendencies" ref="paranoidTendencies" style="height: 500px"
                        v-loading="loadingTendenies" element-loading-text="学生偏执倾向加载中"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
            </el-row><br />
            <!--数据分析 第二行-->
            <el-row :gutter="24" class="el-rowshow el-rowshow" style="padding-bottom: -50px; height: 240px">
                <el-col :span="8" :offset="4">
                    <div class="sty" id="anxietyTendencies" ref="anxietyTendencies"
                        style="height: 500px; margin-top: -230px" v-loading="loadingTendenies"
                        element-loading-text="学生焦虑倾向加载中" element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(225, 225, 225,0 )"></div>
                </el-col>

                <el-col :span="8">
                    <div class="sty el-rowshow2" id="hostileTendencies" ref="hostileTendencies" style="height: 500px"
                        v-loading="loadingTendenies" element-loading-text="学生敌对倾向加载中"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225, 0)">
                    </div>
                </el-col>
            </el-row><br />
            <!--数据分析 第三行-->
            <el-row class="">
                <el-col>
                    <div class="sty ssfx" id="emtionStatus" ref="emtionStatus" style="height: 500px"
                        v-loading="loadingStatus" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(200,200,200, 0.8)"></div>
                </el-col>
                <!-- </el-table> -->
            </el-row>
        </el-card>
        <!-- <video src="../assets/video/test.mp4"></video> -->
    </div>
</template>

<script>
import * as echarts from "echarts"

export default {
    computed: {},
    data() {
        return {
            role: JSON.parse(localStorage.getItem("userinfo")).role,
            numberValidateForm: {
                age: "今天心情还不错",
            },
            needinput: false,
            audionum: 0,
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
            editable: true,
            loadingTendenies: true,
            loadingStatus: true,
            textFen: null,
            videoFen: null,
            audioFen: null,
            weiboID: 7147692410,
            weiboText: "双击输入微博ID",
            audiowav: "http://221.181.94.90:8890/audio/" + "154" + ".wav",
            playerOrNot: 0,
            depressedTendencies: 0,
            depressedWarning: 0,
            paranoidTendencies: 0,
            anxietyTendencies: 0,
            hostileTendencies: 0,
            // status
            timeData: [new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0') + ":" + new Date().getSeconds().toString().padStart(2, '0')],
            boringData: [0],
            confusionData: [0],
            frustrationData: [0],
            delightedData: [0],
            participationData: [0],
        };
    },
    mounted() {
        this.utils.vedio(this, "http://124.222.217.145:8090/live/" + 154 + ".flv")
        this.loadingTendenies = false
        this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedTendencies", this.depressedTendencies, "#38C3A1", "抑郁倾向")
        this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedWarning", this.depressedWarning, "#38C3A1", "倾向预警")
        this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("paranoidTendencies", this.paranoidTendencies, "#808080", "偏执倾向")
        this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("anxietyTendencies", this.anxietyTendencies, "#808080", " 焦虑倾向")
        this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("hostileTendencies", this.hostileTendencies, "#808080", "敌对倾向")
        // this.request.get("/mental_health_scores").then(res => {
        //     this.depressedTendencies = Number(res.depressedTendencies);
        //     this.depressedWarning = Number(res.depressedWarning);
        //     this.paranoidTendencies = Number(res.paranoidTendencies);
        //     this.anxietyTendencies = Number(res.anxietyTendencies);
        //     this.hostileTendencies = Number(res.hostileTendencies);
        //     this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedTendencies", this.depressedTendencies, "#666", "抑郁倾向")
        //     this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedWarning", this.depressedWarning, "#38C3A1", "倾向预警")
        //     this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("paranoidTendencies", this.paranoidTendencies, "#666", "偏执倾向")
        //     this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("anxietyTendencies", this.anxietyTendencies, "#666", " 焦虑倾向")
        //     this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("hostileTendencies", this.hostileTendencies, "#666", "敌对倾向")
        // });

        // setInterval(() => {
        //     this.request.get("/mental_health_scores").then(res => {
        //         this.depressedTendencies = Number(res.depressedTendencies);
        //         this.depressedWarning = Number(res.depressedWarning);
        //         this.paranoidTendencies = Number(res.paranoidTendencies);
        //         this.anxietyTendencies = Number(res.anxietyTendencies);
        //         this.hostileTendencies = Number(res.hostileTendencies);
        //         this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedTendencies", this.depressedTendencies, "#666", "抑郁倾向")
        //         this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("depressedWarning", this.depressedWarning, "#38C3A1", "倾向预警")
        //         this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("paranoidTendencies", this.paranoidTendencies, "#666", "偏执倾向")
        //         this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("anxietyTendencies", this.anxietyTendencies, "#666", " 焦虑倾向")
        //         this.echartsDepressedParanoidAnxietyHostileTendenciesWarning("hostileTendencies", this.hostileTendencies, "#666", "敌对倾向")
        //     });
        // }, 10000); // 每隔10秒更新一次数据

        this.loadingStatus = false
        this.echartsInteractionConcentrationStatusData();
        this.echartsStatus(); // 更新图表

        setInterval(() => {
            this.echartsInteractionConcentrationStatusData();
            this.echartsStatus(); // 更新图表
        }, 30000); // 每隔30秒更新一次数据
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
    methods: {
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
        changeGroup() {
            console.log(1)
        },
        search() {
            console.log(2)
        },
        dblweibo() {
            this.needinput = true;
            this.editable = false;
        },
        weiboblur() {
            this.editable = true;
            this.needinput = false;
            this.weibo();
        },
        submitForm(formName, target) {
            $(target).slideUp();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        weibo() {
            let _this = this;
        },
        echartsDepressedParanoidAnxietyHostileTendenciesWarning(elementId, value, color, name) {
            var chartDom = document.getElementById(elementId);
            var myChart = echarts.init(chartDom);

            if (value <= 0 || (!value)) {
                value = 0;
            } else if (value <= 1) {
                value = (value * 100).toFixed(0);
                // console.log(value);
            } else {
                value = value.toFixed(0);
            }
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
            if (elementId == 'depressedTendencies') {
                myChart.on("click", function (params) {
                    $(".tendenciesDialog").slideDown();
                });
            } else if (elementId == 'depressedWarning') {
                myChart.on("click", function (params) {
                    $(".warningDialog").slideDown();
                });
            }

        },
        echartsStatus() {
            var chartDom = document.getElementById("emtionStatus");
            var myChart = echarts.init(chartDom);
            var title = "情感状态分析"
            var content = ["无聊", "困惑", "沮丧", "愉悦", "参与"]
            var timeData = this.timeData
            var boringData = this.boringData
            var confusionData = this.confusionData
            var frustrationData = this.frustrationData
            var delightedData = this.delightedData
            var participationData = this.participationData

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
                    data: timeData,
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
                    data: boringData,
                    showSymbol: false,
                    color: "#bf444c",
                },
                {
                    name: content[1],
                    type: "line",
                    stack: "",
                    data: confusionData,
                    showSymbol: false,
                    color: "#000",
                },
                {
                    name: content[2],
                    type: "line",
                    stack: "",
                    data: frustrationData,
                    showSymbol: false,
                    color: "#59d0b3",
                },
                {
                    name: content[3],
                    type: "line",
                    stack: "",
                    data: delightedData,
                    showSymbol: false,
                    color: "#e8bb8e",
                },
                {
                    name: content[4],
                    type: "line",
                    stack: "",
                    data: participationData,
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
.el-row {
    margin-bottom: 7px;
}

.el-col {
    border-radius: 4px;
}

.el-message {
    position: relative;
    margin-top: 80px !important;
    z-index: 9999 !important;
    transition: all 1s !important;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

#J_prismPlayer {
    background-image: url("../assets/实时监控.png"),
        linear-gradient(135deg, #38c3a1, #c9fdf0);
    background-repeat: no-repeat;
    background-size: 50px 50px, 227px 100%;
    background-position: 50% 55%;
}

.el-rowshow1 {
    height: 300px;
    top: -50px;
}

#weibo {
    display: block;
    width: 200px !important;
    word-break: normal;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
}

.el-rowshow {
    top: -30px;
}

.el-rowshow2 {
    top: -120px;
}

.sty {
    /* border: 2px solid #dae4e7; */
    margin-top: -104px;
    text-align: left;
    font-size: 14px;
}

.ssfx {
    margin-top: -250px !important;
}

.tendenciesDialog {
    width: 420px;
    height: 200px;
    display: none;
    /* border: 1px solid #999; */
    background-color: #fff;
    position: absolute;
    top: 34px;
    left: 258px;
    z-index: 99;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px #000;
}

.warningDialog {
    width: 420px;
    /* height: 200px; */
    display: none;
    /* border: 1px solid #999; */
    background-color: #fff;
    box-shadow: 0px 0px 15px 0px #000;
    position: absolute;
    top: 34px;
    left: 258px;
    z-index: 99;
    border-radius: 15px;
}

.xinqshuru {
    width: 400px;
    margin-left: -10px;
    margin-top: 45px;
}

.xinqshuru2 {
    width: 420px;
    margin-left: -10px;
}

.is-required>label {
    width: 60px !important;
}

.demo-ruleF {
    width: 400px;
}

.weiboID>input {
    border: 0px !important;
}

.yjtab {
    width: 90%;
    text-align: center;
    border: 1px solid #666;
    margin: 0 auto;
    border-collapse: collapse;
    margin-bottom: 10px;
}

.yjtab td {
    border: 1px solid #666;
}

.yjtab span {
    margin-left: 10px;
    font-size: 14px;
    color: #666;
}

.yjtab td:not(td:nth-child(2)) {
    width: 60px;
}

.el-rowshow3 {
    height: 186px;
}
</style>
