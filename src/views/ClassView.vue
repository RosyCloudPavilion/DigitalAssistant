<template>
    <!--html代码 -->
    <div class="bjst" style="text-align: center">
        <!--条件栏-->

        <el-card class="box-card searchnav">
            <el-button-group style="width: 100%">
                <el-row :span="20">
                    <el-col :span="6" style="width: 22%">
                        <div class="grid-content bg-purple" style="text-align: left">
                            <span style="
                    font-size: 20px;

                    padding-left: 5px;
                  "><strong>&nbsp;&nbsp;&nbsp;&nbsp;班级视图</strong></span>
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-light" style="text-align: right">
                            <el-form :model="form" :inline="true" class="demo-form-inline el-row1">
                                <el-row>
                                    <el-form-item label="选择班级：">
                                        <el-select v-model="form.class" placeholder="请选择班级" @change="changeClass"
                                            class="el-select1">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-button size="medium" @click="search">搜索</el-button>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </el-button-group>
        </el-card>
        <br />
        <el-card class="box-card showmain">
            <!--数据分析 第一行-->
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="">
                    <h4 style="
                text-align: left;
                line-height: 20px;
                margin-top: -10px;
                margin-bottom: 41px;
                border-left: 5px solid #38c3a1;
                padding-left: 5px;
              ">
                        班级概览
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="box-sizing: border-box" class="el-rowshow3">
                <el-col :span="6" class="">
                    <div id="J_prismPlayer" style="height: 170px; width: 227px">

                    </div>
                    <el-button type="text"
                        style="position: absolute; bottom: 50px; left: 30%; transform: translateX(-50%);"
                        @click="dialogVisible = true">
                        查看详情
                    </el-button>
                </el-col>
                <el-col :span="16" class="informationStyle">
                    <h3 style="
                text-align: left;
                margin-top: -80px;
                font-size: 16px;
                margin-left: 81px;
              ">
                        班级信息
                    </h3>
                    <div style="
                height: 200px;
                margin-left: 81px;
                margin-top: 6px;
                font-size: 14px;
                text-align: left;
              ">
                        <p>院系名称:{{ "计算机科学技术学院" }}</p>
                        <p>班级名称:{{ "电子商务" }}</p>
                    </div>
                </el-col>

            </el-row>
            <el-row :gutter="24" style="box-sizing: border-box">
                <el-col :span="24" class="" style="text-align: left; height: 60px">
                    <h4 style="
                text-align: left;
                margin-top: 0px;
                margin-left: 0px;
                border-left: 5px solid #38c3a1;
                padding-left: 5px;
              ">
                        小组分数
                    </h4>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom: 150px; width: 100%" class="stys">

                <div class="informationStyle" id="groupScore" ref="groupScore" style="height: 432px; width: 198%"></div>
            </el-row>
        </el-card>

        <el-dialog title="视频监控" :visible.sync="dialogVisible" width="95%" top="10vh" :style="{ color: '#ffffff' }">
            <div style="display: flex; justify-content: space-between; color: #ffffff;">

                <!-- 左边：四个摄像头的画面 -->
                <div
                    style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; width: 48%; margin-top: 50px;">
                    <div id="J_prismPlayer1" style="background-color: #333; height: 200px; border-radius: 8px;">
                        <!-- 摄像头画面1 -->
                        <img src="../assets/vision1.jpg" alt="Vision 1"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div id="J_prismPlayer1" style="background-color: #333; height: 200px; border-radius: 8px;">
                        <!-- 摄像头画面2 -->
                        <img src="../assets/vision2.jpg" alt="Vision 2"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div id="J_prismPlayer1"
                        style="background-color: #333; height: 200px; border-radius: 8px; margin-top: 10px;">
                        <!-- 摄像头画面3 -->
                        <img src="../assets/vision3.jpg" alt="Vision 3"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div id="J_prismPlayer1"
                        style="background-color: #333; height: 200px; border-radius: 8px; margin-top: 10px;">
                        <!-- 摄像头画面4 -->
                        <img src="../assets/vision4.jpg" alt="Vision 4"
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                    </div>
                </div>

                <!-- 右边：检测到的人脸和对应的学生 -->
                <div style="width: 48%; background-color: #222; padding: 20px; border-radius: 8px; height: 400px; overflow-y: auto;"
                    v-loading="loading">
                    <el-button class="custom-button" v-if="!isContentVisible" type="text"
                        style="color: #ffffff; font-size: 16px; margin-bottom: 20px; padding: 8px"
                        @click="startDetection">
                        开始检测
                    </el-button>

                    <div v-else>
                        <h3 style="color: #ffffff;">检测到的人脸</h3>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="按视角" name="first">
                                <div v-if="loading && activeName === 'first'" class="loading-message">加载中...</div>
                                <div v-else>
                                    <div v-for="(images, index) in faceImagesByView" :key="index" class="image-row">
                                        <div class="view-title">视角 {{ index + 1 }}</div>
                                        <div v-for="(image, idx) in images" :key="idx" class="image-container">
                                            <img :src="image" alt="Face Image" class="face-image" />
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>

                            <el-tab-pane label="按身份" name="second">
                                <div v-if="loading && activeName === 'second'" class="loading-message">空间对齐中...</div>
                                <div v-else>
                                    <el-button type="primary" size="small" @click="startRecognition">
                                        开始识别
                                    </el-button>

                                    <div style="margin-bottom: 10px;"></div>

                                    <div v-for="(images, index) in faceImagesByPerson" :key="index" class="image-row2">
                                        <div class="view-title">学生 {{ index + 1 }}: </div>

                                        <div v-for="(image, idx) in images" :key="idx" class="image-container">
                                            <!-- 根据 showLastImage 控制图片显示 -->
                                            <img v-if="idx !== images.length - 1" :src="image" alt="Face Image"
                                                class="face-image" />
                                        </div>
                                        <!-- 动态点点点效果 -->
                                        <div class="dots-container">
                                            <span>{{ loadingDots[index] }}</span>
                                        </div>
                                        <transition name="fade">
                                            <div v-if="showLastImage" style="padding-right: 10px;" class="image-last">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <img :src="images[images.length - 1]" alt="Last Face Image"
                                                            class="face-image" />
                                                    </el-col>
                                                    <el-col :span="12">
                                                        <div style="width:60px">{{ studentNames[index] }}</div>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </transition>

                                    </div>
                                </div>

                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" style="background-color: #333; border-color: #333;"
                    @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import * as echarts from "echarts";

export default {
    computed: {},
    data() {
        return {
            loadingDots: [], // 存储每行的点点点状态
            loadingDotsInterval: null,
            options: [
                { value: 154, label: "电子商务" },
                { value: 155, label: "信息工程" },
                { value: 156, label: "软件工程" },
                { value: 157, label: "网络空间安全" },
            ],
            form: {
                student: 72,
                class: 154,
                group: 154,
            },
            formname: {
                student: "",
                class: "",
                group: "",
            },
            playerOrNot: 0,
            dialogVisible: false,
            activeName: "first",
            faceImagesByView: [
                [
                    require('@/assets/detected_faces_vision1/face_1.jpg'),
                    require('@/assets/detected_faces_vision1/face_2.jpg'),
                    require('@/assets/detected_faces_vision1/face_3.jpg'),
                    require('@/assets/detected_faces_vision1/face_4.jpg'),
                    require('@/assets/detected_faces_vision1/face_5.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision2/face_1.jpg'),
                    require('@/assets/detected_faces_vision2/face_2.jpg'),
                    require('@/assets/detected_faces_vision2/face_3.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision3/face_1.jpg'),
                    require('@/assets/detected_faces_vision3/face_2.jpg'),
                    require('@/assets/detected_faces_vision3/face_3.jpg'),
                    require('@/assets/detected_faces_vision3/face_4.jpg'),
                    require('@/assets/detected_faces_vision3/face_5.jpg'),
                ],
                [
                    require('@/assets/detected_faces_vision4/face_1.jpg'),
                    require('@/assets/detected_faces_vision4/face_2.jpg'),
                    require('@/assets/detected_faces_vision4/face_3.jpg'),
                    require('@/assets/detected_faces_vision4/face_4.jpg'),
                    require('@/assets/detected_faces_vision4/face_5.jpg'),
                ]
            ],
            faceImagesByPerson: [
                [
                    require('@/assets/detected_faces_vision1/face_1.jpg'),
                    require('@/assets/detected_faces_vision3/face_1.jpg'),
                    require('@/assets/detected_faces_vision4/face_2.jpg'),
                    require('@/assets/person/xuzheng.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision1/face_2.jpg'),
                    require('@/assets/detected_faces_vision2/face_2.jpg'),
                    require('@/assets/person/zhaofanyu.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision1/face_3.jpg'),
                    require('@/assets/detected_faces_vision2/face_3.jpg'),
                    require('@/assets/detected_faces_vision3/face_3.jpg'),
                    require('@/assets/detected_faces_vision4/face_5.jpg'),
                    require('@/assets/person/xiewanchao.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision1/face_4.jpg'),
                    require('@/assets/detected_faces_vision2/face_1.jpg'),
                    require('@/assets/person/zhaoyifei.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision1/face_5.jpg'),
                    require('@/assets/detected_faces_vision3/face_2.jpg'),
                    require('@/assets/detected_faces_vision4/face_3.jpg'),
                    require('@/assets/person/dingchaoyue.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision3/face_4.jpg'),
                    require('@/assets/detected_faces_vision4/face_4.jpg'),
                    require('@/assets/person/linyixuan.jpg')
                ],
                [
                    require('@/assets/detected_faces_vision3/face_5.jpg'),
                    require('@/assets/detected_faces_vision4/face_1.jpg'),
                    require('@/assets/person/wangshuaiyu.jpg')
                ]
            ],
            studentNames: [
                "徐铮",
                "赵梵宇",
                "谢万超",
                "赵一飞",
                "丁超越",
                "林义宣",
                "王帅宇",
            ],
            loading: false, // 控制 v-loading
            isContentVisible: false, // 控制内容显示状态
            showLastImage: false,
            groupData: [80, 90, 70, 85, 95, 75, 65, 66],
        };
    },
    mounted() {
        this.utils.vedio(this, "http://124.222.217.145:8090/live/" + 154 + ".flv")
        this.echartsGroupScore()
        // 初始化每行的点点点状态
        this.loadingDots = new Array(this.faceImagesByPerson.length).fill('');
        this.request.get("/group_scores").then(res => {
            this.groupData = res;
            this.echartsGroupScore(); // 更新图表
        });

        setInterval(() => {
            this.request.get("/group_scores").then(res => {
                this.groupData = res;
                this.echartsGroupScore(); // 更新图表
            });
        }, 10000); // 每隔10秒更新一次数据
    },

    methods: {
        startLoadingDots() {
            // 启动动态加载的点点点效果
            this.loadingDotsInterval = setInterval(() => {
                this.loadingDots = this.loadingDots.map((dots) => {
                    if (dots.length >= 30) {

                        this.showLastImage = true;

                        // 点点点达到 20 个字符时，停止加载
                        clearInterval(this.loadingDotsInterval);
                    }
                    return dots + '·';
                });
            }, 100);
        },
        stopLoadingDots() {
            // 停止点点点效果
            clearInterval(this.loadingDotsInterval);
        },

        startRecognition() {
            this.startLoadingDots()
        },
        handleClick(tab) {
            if (tab.name === "second") {
                this.loading = true; // 开启加载状态
                setTimeout(() => {
                    this.loading = false; // 两秒后关闭加载状态
                }, 2000);
            }
        },
        startDetection() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.isContentVisible = true;
            }, 2000); // 模拟两秒加载
        },
        changeClass() {
            console.log(1)
        },
        search() {
            console.log(2)
        },
        echartsGroupScore() {
            var chartDom = document.getElementById("groupScore");
            if (!chartDom) {
                chartDom = document.querySelector("#bjcontainer");
            }
            var myChart = echarts.init(chartDom);
            var barindex = 0;
            var colorList = ["#3EB296", "#EA7E5D", "#FFB071", "#B6BED3"];
            var echartReportbarData = [
                "第一组",
                "第二组",
                "第三组",
                "第四组",
                "第五组",
                "第六组",
                "第七组",
                "第八组",
            ];
            var option = {
                title: {
                    top: 408,
                    text: "小组视图-小组总分",
                    x: "center",
                },
                backgroundColor: "#fff",
                legend: {
                    show: false,
                },
                grid: {},

                yAxis: {
                    type: "value",

                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                },
                xAxis: [{
                    type: "category",
                    // inverse: true,

                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    hoverAnimation: false,
                    data: echartReportbarData,
                    axisLabel: {
                        margin: 10,
                        fontSize: 14,
                        align: "center",
                        color: "#000",
                        rich: {
                            a1: {
                                color: colorList[0],

                                align: "right",
                            },
                            a2: {
                                color: colorList[1],
                                align: "right",
                            },
                            a3: {
                                color: colorList[2],
                                align: "right",
                            },
                            b: {
                                color: "#252630",
                                align: "right",
                            },
                        },

                    },
                },

                {
                    type: "category",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },

                    data: echartReportbarData,
                    axisLabel: {
                        margin: 30,
                        fontSize: 14,
                        align: "center",
                        rich: {
                            a1: {
                                color: "#fff",
                                backgroundColor: colorList[0],
                                width: 30,
                                height: 30,
                                align: "center",
                                borderRadius: 50,
                            },
                            a2: {
                                color: "#fff",
                                backgroundColor: colorList[1],
                                width: 30,
                                height: 30,
                                align: "center",
                                borderRadius: 50,
                            },
                            a3: {
                                color: "#fff",
                                backgroundColor: colorList[2],
                                width: 30,
                                height: 30,
                                align: "center",
                                borderRadius: 50,
                            },
                            b: {
                                color: "#fff",
                                backgroundColor: colorList[3],
                                width: 30,
                                height: 30,
                                align: "center",
                                borderRadius: 50,
                            },
                        },
                        formatter: function (params) {
                            if (barindex == echartReportbarData.length) {
                                barindex = 0;
                            }
                            barindex++;
                            if (barindex - 1 < 3) {
                                return ["{a" + barindex + "|" + barindex + "}"].join("\n");
                            } else if (barindex - 1 < 6) {
                                return ["{a" + (barindex - 3) + "|" + barindex + "}"].join(
                                    "\n"
                                );
                            } else if (barindex - 1 < 9) {
                                return ["{a" + (barindex - 6) + "|" + barindex + "}"].join(
                                    "\n"
                                );
                            }
                        },
                    },
                },
                ],
                series: [{
                    z: 20,
                    name: "value",
                    type: "bar",
                    barWidth: 40,
                    data: this.groupData.map((item, i) => {
                        var colorTemp;
                        if (i < 3) {
                            colorTemp = colorList[i];
                        } else if (i < 6) {
                            colorTemp = colorList[i - 3];
                        } else if (barindex - 1 < 9) {
                            colorTemp = colorList[i - 6];
                        }
                        var itemStyle = {
                            color: colorTemp,
                        };
                        return {
                            value: item,
                            itemStyle: itemStyle,
                        };
                    }),
                    label: {
                        show: true,
                        position: "insideRight",
                        color: "#fff",
                        fontSize: 12,
                        // offset: [10, 0]
                    },
                    itemStyle: {
                        barBorderRadius: [2],
                    },
                },],
            };
            myChart.setOption(option)
            window.addEventListener('resize', () => {
                myChart.resize()
            })
        }

    }
}
</script>

<style scoped>
.dots-container {
    position: absolute;
    left: 300px;
    color: rgb(233, 173, 20);
    font-size: 20px;
    margin-left: 10px;
}

.stys {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

#bjcontainer {
    position: relative;
    left: -120px;
    margin-left: -100px;
    margin-bottom: 80px;
    width: 540px;
}

canvas {
    height: 432px !important;
    left: 100px !important;
}

.informationStyle {
    margin: 0 0px 0px 0px;
    padding-top: 40px;
    /* border-top: 2px solid #dae4e7; */
}

#J_prismPlayer {
    margin-top: -50px;
    margin-left: 10px;
    background-image: url("../assets/实时监控.png"),
        linear-gradient(135deg, #38c3a1, #c9fdf0);
    background-repeat: no-repeat;
    background-size: 50px 50px, 227px 100%;
    background-position: 50% 55%;
}

#J_prismPlayer1 {
    margin-top: -50px;
    margin-left: 10px;
    background-image: url("../assets/实时监控.png");
    background-repeat: no-repeat;
    background-size: 50px 50px, 227px 100%;
    background-position: 50% 55%;
}

.el-dialog__header {
    background: #1468A4;

}

/* 弹出层设置背景色 底部*/

.el-dialog__footer {
    background-color: #5ABEF2 !important;

}

/* 弹出层设置背景色 身体部份*/
.el-dialog__body {
    background: linear-gradient(to bottom, #1468A4, #5ABEF2);
    background-size: 100%, 100%;

}

::v-deep .el-dialog {
    background-color: #122343e0;
    color: #ffffff;
}

::v-deep .el-dialog__title {
    color: #dce8f7;
}

::v-deep .el-tabs__item {
    color: #ffffff;
}

::v-deep .custom-button {
    background-color: #249bcf;

}

::v-deep .custom-button:hover {
    background-color: #efbc3a;

}

/* 确保每行图片按水平排列 */
.image-row {
    display: flex;
    align-items: center;
    /* 垂直居中对齐图片 */
    margin-bottom: 20px;
    /* 给每个视角间距 */
    justify-content: flex-start;
}

.image-container {
    margin-right: 10px;
    /* 图片之间的间距 */
}

.image-row2 {
    display: flex;
    align-items: center;
    /* 垂直居中对齐图片 */
    margin-bottom: 20px;
    /* 给每个视角间距 */
    justify-content: flex-start;
}

.image-last {
    margin-left: auto;
    /* 将最后一个图片容器推到右边 */
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s ease-in-out;
    /* 设置渐变效果，0.5s 是持续时间 */
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    /* 初始状态或消失状态 */
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    /* 完成状态或开始消失状态 */
}

/* 确保图片的高度统一，同时保持宽度的自适应 */
.face-image {
    height: 50px;
    /* 设置统一的高度 */
    object-fit: cover;
    /* 保持图片的宽高比，裁剪多余部分 */
    width: auto;
    /* 宽度自适应 */
}

/* 视角标题的样式 */
.view-title {
    margin-right: 20px;
    /* 视角标题和图片之间的间距 */
    font-weight: bold;
    font-size: 16px;
}

.loading-message {
    text-align: center;
    color: #acffbe;
    font-size: 18px;
    margin-top: 20px;
}

.recognize-button {
    position: absolute;
    top: 160px;
    /* 调整按钮高度使其与Tab标签对齐 */
    right: 60px;
    /* 距离右边距 */
    z-index: 1;
    /* 确保按钮位于Tab前面 */
    font-size: 14px;
}
</style>
