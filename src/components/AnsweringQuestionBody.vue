<template>
<div>
    <div class="guide">
        <span style="
          display: block;
          position: fixed;
          top: 100px;
          z-index: 9999;
          font-size: 14px;
          color: #666;
        ">图灵机器
            <el-switch v-model="tuling" active-color="#13ce66" inactive-color="" inactive-text="" :active-value="true" :inactive-value="false">
            </el-switch></span>

        <span style="
          display: block;
          position: fixed;
          top: 100px;
          font-size: 14px;
          z-index: 9999;
          margin-left: 150px;
        ">互动答疑
            <el-switch v-model="beta" active-color="#13ce66" inactive-color="" inactive-text="" :active-value="true" :inactive-value="false">
            </el-switch>
        </span>

        <div style="
          height: 330px;
          width: 360px;
          float: left;
          margin-top: 20px;
          overflow: hidden;
        ">
            <h4 style="
            position: absolute;
            top: -40px;
            border-left: 5px solid #38c3a1;
            padding-left: 5px;
            line-height: 20px;
          ">
                相关问题
            </h4>
            <div style="
          height: 330px;
          width: 400px
          overflow: hidden;
          overflow-y: auto;
          padding-top:10px;
          padding-left:30px;
        ">
                <div v-for="(item, index) in guideQuestion" :key="index" @click="sendGuide(item.question)" data-s="item.question" class="tipQuestion" style="
              width: 300px;
              line-height: 40px;
              background-color: #f7f5f6;
              margin-bottom: 20px;
              border: 1px solid #fff;
              border-radius: 12px;
              font-size: 14px;
            ">
                    {{ item.question }}
                </div>
            </div>
            <!-- <button bindtap="goToPDF">参考文档</button> -->
        </div>
        <h4 style="
          position: absolute;
          top: 345px;
          border-left: 5px solid #38c3a1;
          padding-left: 5px;
          line-height: 20px;
        ">
            知识图谱
        </h4>
        <div class="container1">
            <canvas id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></canvas>
        </div>
    </div>
    <div class="hddybody" v-loading="loading" element-loading-text="寻找答案中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">
        <h4 style="
          position: absolute;
          top: -15px;
          left: -8px;
          margin-top: 15px;
          text-align: left;
          padding-left: 5px;
          border-left: 5px solid #38c3a1;
          line-height: 20px;
        ">
            数字助教
        </h4>
        <div style="overflow: hidden; margin-top: 40px">
            <div style="height: 562px; overflow-y: auto; width: 716px">
                <!-- <div class='scrollMsg'> -->
                <div class="scrolldiv">
                    <div v-for="(item, index) in msgList" :key="index">
                        <!-- 单个消息1 答疑机器人发出（左） -->

                        <div v-if="item.speaker == 'server'" style="
                  display: flex;
                  padding: 0px 150px 15px 0px;
                  text-align: left;
                ">
                            <div style="width: 40px; height: 40px">
                                <img style="
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      border: 1px solid #ccc;
                    " src="../assets/u=3987128889,2725446751&fm=26&fmt=auto&gp=0.webp" />
                            </div>
                            <div class="leftMsg">{{ item.content }}</div>
                        </div>

                        <!-- 单个消息2 用户发出（右） -->
                        <div v-else style="
                  display: flex;
                  justify-content: flex-end;
                  padding: 0px 0px 15px 150px;
                  margin-right: 30px;
                ">
                            <div class="rightMsg">{{ item.content }}</div>
                            <div style="
                    width: 40px;
                    height: 40px;
                    margin-right: 0.5px;
                    display: flex;
                    margin-left: 15px;
                    align-items: center;
                    overflow: hidden;
                    z-index: 9;
                  ">
                                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      margin-left: 0px;
                    " />
                            </div>
                            <div style="
                    width: 10px;
                    height: 40px;
                    border-radius: 5px;
                    overflow: hidden;
                  ">
                                <!-- <image style='width: 11vw; height: 11vw; border-radius: 10rpx;' src='{{userInfo.avatarUrl}}'></image> -->
                                <!-- <open-data type="userAvatarUrl"></open-data> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- </div> -->

                <!-- 占位 -->
                <!-- <div style="width: 100%; height: 180px"></div> -->
            </div>

            <div class="inputRoom" style="bottom: 0px">
                <input v-model="inputVal" @keyup.enter="sendClick" @focus="" @blur="" class="sendinp" type="textarea" />
                <!-- <img
            src="../../assets/name.png"
            bindtouchstart="touchStart"
            bindtouchend="touchEnd"
            class="enter"
          /> -->
                <el-button style="
              position: absolute;
              right: 30px;
              height: 30px;
              line-height: 0px;
            " @click="sendClick">发送</el-button>
                <div class="startYuyinImage" v-if="recordState == true">
                    <img src="/img/yuyin.png" />
                    <div>开始语音</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import * as echarts from "echarts";

export default {
    //import引入的组件需要注入到对象components中才能使用
    components: {},

    data() {
        //这里存放数据
        return {
            loading: false,
            tuling: false,
            beta: false,
            ec: {
                // onInit: initChart,
            },
            msgList: [{
                speaker: "server",
                contentType: "text",
                content: "您好，请问有什么可以帮助的吗？",
            }, ],
            listdata: [],
            lines: [],
            left: 85,
            top: 40,
            noclick: 0,
            userInfo: {},
            hasUserInfo: false,
            guideQuestion: [{
                    question: "请问你是谁？",
                },
                {
                    question: "怎么算胜利呢？",
                },
                {
                    question: "如何进入下一轮？",
                },
                {
                    question: "酒店管理沙盘有什么作用？",
                },
                {
                    question: "什么是酒店管理沙盘？",
                },
                {
                    question: "酒店管理沙盘有什么作用？",
                },
                {
                    question: "什么是酒店管理沙盘？",
                },
            ],

            recordState: false, //录音状态
            inputVal: "",
        };
    },
    //计算属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        inputVal: function () {
            // console.log("input发生变化了");
        },
        tuling: function () {
            if (this.tuling) {
                this.beta = false;
            }
        },
        beta: function () {
            if (this.beta) {
                this.tuling = false;
            }
        },
    },
    //方法集合
    methods: {
        options(graph) {
            this.listdata = [];
            this.lines = [{
                source: 0,
                target: 1,
                value: "",
            }, ];
            var num = 0;
            console.log(graph);
            // if (graph.father.length == 0) {
            //   var faobj = {};
            // } else {
            var faobj = {
                name: graph.father[0],
                id: 0,
                category: 0,
                draggable: true,
            };
            this.listdata.push(faobj);
            // }

            num += 1;
            var faobj2 = {
                name: graph.current[0],
                id: 1,
                category: 1,
                draggable: true,
            };
            // this.listdata.push(faobj);
            this.listdata.push(faobj2);
            num += 1;
            for (var i = 0; i < graph.son.length; i++) {
                var lineson1 = {
                    source: 1,
                    target: num,
                    value: graph.son[i].current[0],
                };
                this.lines.push(lineson1);
                var num2 = num;
                var sonobj1 = {
                    name: graph.son[i].current[0],
                    id: num,
                    category: 2,
                    draggable: true,
                };
                this.listdata.push(sonobj1);
                num += 1;
                for (var j = 0; j < graph.son[i].son.length; j++) {
                    var lineson2 = {
                        source: num2,
                        target: num,
                        value: graph.son[i].son[j],
                    };
                    this.lines.push(lineson2);
                    var sonobj2 = {
                        name: graph.son[i].son[j],
                        id: num,
                        category: 4,
                        draggable: true,
                    };
                    this.listdata.push(sonobj2);
                    num += 1;
                }
            }
            console.log(this.listdata);
            // if (graph.father.length == 0) {
            //   this.listdata.shift();
            // }
            console.log(this.listdata);
            this.knowledgegraph(this.listdata, this.lines);
        },
        knowledgegraph(listdata, lines) {
            var _this = this;
            var dom = $(".container1")[0];
            // $("#mychart-dom-bar").remove();
            // $(".container1").append(
            //   '<canvas id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ec"></canvas>'
            // );
            var myChart = echarts.init(dom);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
            option = null;
            // var datas = listdata;
            // var lines = lines;
            var option = {
                title: {
                    text: "",
                    left: "0",
                    textStyle: {
                        align: "center",
                    },
                },
                color: [
                    "#38c3a1",
                    "#E3E3E3",
                    "#6BF1D0",
                    "#A9FFEA",
                    "#afdcfc",
                    "#afdcfc",
                    "#afdcfc",
                ],
                tooltip: {},
                animationDurationUpdate: 500,
                label: {
                    normal: {
                        // show: false,
                        textStyle: {
                            fontSize: 12,
                        },
                    },
                },
                series: [{
                    type: "graph",
                    layout: "force", //采用力引导布局
                    symbolSize: 20,
                    legendHoverLink: false, //启用图例 hover 时的联动高亮。
                    focusNodeAdjacency: false, //在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                    roam: false,
                    label: {
                        normal: {
                            show: true,
                            position: "right",
                            textStyle: {
                                fontSize: 12,
                            },
                        },
                    },
                    force: {
                        repulsion: 200,
                    },
                    edgeSymbolSize: [0, 0],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 10,
                                show: false,
                            },
                            formatter: "{c}",
                        },
                    },
                    categories: ["当前", "二级", "三级", "四级", "五级"],

                    data: _this.listdata,
                    links: _this.lines,
                    lineStyle: {
                        show: false,
                        normal: {
                            opacity: 1,
                            width: 1,
                            curveness: 0,
                        },
                    },
                }, ],
            };

            myChart.setOption(option);
            // var noclick=0;
            if (_this.noclick == 0) {
                myChart.on("click", function (params) {
                    console.log(params);
                    var that = this;
                    _this.loading = true;
                    var msgList = _this.msgList;
                    var inputVal = _this.inputVal;
                    var datavalue = "";
                    if (params.dataType == "node") {
                        datavalue = params.name;
                    } else if (params.dataType == "edge") {
                        datavalue = params.value;
                    }
                    msgList.push({
                        speaker: "customer",
                        contentType: "text",
                        content: "我想了解" + datavalue,
                    });

                    $.ajax({
                        url: "https://www.gaozhu.net.cn:5030/chat/chatbeta",
                        method: "GET",
                        data: {
                            msg: datavalue,
                        },
                        success: function (res) {
                            var res1 = JSON.parse(res);
                            _this.loading = false;
                            msgList.push({
                                speaker: "server",
                                contentType: "text",
                                content: res1.as,
                            });
                            console.log(222);
                            var graph = res1.graph;
                            that.inputVal = "";

                            if (graph.current.length != 0) {
                                _this.options(graph);
                            }
                        },
                        error: function (err) {
                            _this.loading = false;
                            msgList.push({
                                speaker: "server",
                                contentType: "text",
                                content: "抱歉,网络似乎有点问题...",
                            });
                            that.inputVal = "";
                        },
                    });
                });
                _this.noclick += 1;
            }
        },
        sendClick: function (e) {
            // let _this=this;
            let that = this;
            // that.inputVal;
            var sendinp = $(".sendinp")[0].value;
            if (
                sendinp == "" ||
                sendinp == " " ||
                sendinp == "  " ||
                sendinp == "  "
            ) {
                sendinp == "";
                return;
            }
            var msgList = this.msgList;
            msgList.push({
                speaker: "customer",
                contentType: "text",
                content: sendinp,
            });
            that.inputVal = "";
            $.ajax({
                url: "https://www.mylittlefox.art/api/hudongdayi/hotel_Q",
                method: "GET",
                data: {
                    content: sendinp,
                },
                success: function (res) {
                    var temp = that.guideQuestion;
                    if (res.as != "我也不知道。" && !that.ifInclude(res.as)) {
                        temp.pop();
                        temp.unshift({
                            question: res.as,
                        });
                        that.guideQuestion = temp;
                    }
                    sendinp = "";
                },
                error: function (err) {
                    that.loading = false;
                    that.inputVal = "";
                    sendinp = "";
                    // if (graph["current"].length != 0) {
                    // options(graph);
                    // }
                },
            });
            if (that.beta == true) {
                $.ajax({
                    url: "https://www.gaozhu.net.cn:5030/chat/chatbeta",
                    method: "GET",
                    data: {
                        msg: sendinp,
                    },
                    success: function (res) {
                        res = JSON.parse(res);
                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: res.as,
                        });

                        that.inputVal = "";

                        sendinp = "";
                    },
                    error: function (err) {
                        that.loading = false;
                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: "抱歉,网络似乎有点问题...",
                        });
                        that.inputVal = "";
                        sendinp = "";
                    },
                });
            } else if (that.tuling == true) {
                $.ajax({
                    url: "https://www.gaozhu.net.cn:5030/chat/tuling",
                    method: "GET",
                    data: {
                        msg: sendinp,
                    },
                    success: function (res) {
                        res = JSON.parse(res);

                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: res.as,
                        });
                        that.inputVal = "";
                        sendinp = "";
                    },
                    error: function (err) {
                        _this.loading = false;
                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: "抱歉,网络似乎有点问题...",
                        });
                        that.inputVal = "";
                        sendinp = "";
                    },
                });
            } else {
                $.ajax({
                    url: "https://www.mylittlefox.art/api/hudongdayi/overall",
                    // url: "https://www.gaozhu.net.cn:5030/chat/chatbeta",
                    method: "GET",
                    data: {
                        msg: sendinp,
                    },
                    success: function (res) {
                        res = JSON.parse(res);
                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: res.as,
                        });
                        sendinp = "";
                        that.inputVal = "";
                    },
                    error: function () {
                        msgList.push({
                            speaker: "server",
                            contentType: "text",
                            content: "网络似乎有点问题...",
                        });
                        sendinp = "";
                        that.inputVal = "";
                    },
                });
            }
        },
        ifInclude: function (text) {
            var temp = this.guideQuestion;
            for (var key in temp) {
                if (temp[key].question == text) {
                    return true;
                }
            }
            return false;
        },
        sendGuide: function (val) {
            var msgList = this.msgList;
            msgList.push({
                speaker: "customer",
                contentType: "text",
                content: val,
            });
            var inputVal = this.inputVal;
            let that = this;
            $.ajax({
                url: "https://www.mylittlefox.art/api/hudongdayi/hotel_A",
                method: "GET",
                data: {
                    content: val,
                },
                success: function (res) {
                    msgList.push({
                        speaker: "server",
                        contentType: "text",
                        content: res.as,
                    });
                    that.inputVal = "";
                },
            });
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // console.log(this);
        // _this = this;
        // var msgList = [];
        // msgList = this.msgList;
        $(".scrolldiv")[0].scrollIntoView(false);
        var windowWidth = 800;
        var windowHeight = 400;
        var keyHeight = 0;
        this.listdata = [{
                name: "酒店管理",
                id: "0",
                category: 0,
                draggable: true,
            },
            {
                name: "酒店财务管理",
                id: "1",
                category: 1,
                draggable: true,
            },
            {
                name: "娱乐中心及其服务管理",
                id: "2",
                category: 1,
                draggable: true,
            },
            {
                name: "酒店营销管理",
                id: "3",
                category: 1,
                draggable: true,
            },
            {
                name: "前厅服务管理方法",
                id: "4",
                category: 1,
                draggable: true,
            },
            {
                name: "餐饮服务与实践",
                id: "5",
                category: 1,
                draggable: true,
            },
            {
                name: "客房服务与管理实践",
                id: "6",
                category: 1,
                draggable: true,
            },
        ];
        this.lines = [{
                source: 0,
                target: 1,
                value: "酒店管理>酒店财务管理",
            },
            {
                source: 0,
                target: 6,
                value: "酒店管理>客房服务管理实践",
            },
            {
                source: 0,
                target: 5,
                value: "酒店管理>餐饮服务与实践",
            },
            {
                source: 0,
                target: 4,
                value: "酒店管理>前厅服务管理方法",
            },

            {
                source: 0,
                target: 2,
                value: "酒店管理>娱乐中心及其服务管理",
            },
            {
                source: 0,
                target: 3,
                value: "酒店管理>酒店营销管理",
            },
        ];
        this.knowledgegraph(this.listdata, this.lines);
        // var container1 = $(".container1")[0];
        // console.log(container1);
        // initChart(container1, 500, 150);
        // function initChart(canvas, width, height) {
        //   const chart = echarts.init(canvas, null, {
        //     width: width,
        //     height: height,
        //   });
        //   canvas.setChart(chart);

        //   var size = 30;
        //   var size1 = 30;
        //   var yy = 200;
        //   var yy1 = 250;

        //   var listdata = [];
        //   var links = [];

        //   var med = "生产";
        //   var ope = "销售";
        //   var che = "运输";

        //   //著需要设定一下四个参数
        //   //设定疾病名称
        //   var diease = "电商沙盘";
        //   //设定传入的药品数组
        //   var meds = ["成本", "质量"];
        //   //设定传入的操作数组
        //   var opes = ["订单", "营销策略"];
        //   //设定传入的检查数组
        //   var ches = ["选址", "流量"];

        //   function setData(arr, n) {
        //     for (var i = 0; i < arr.length; i++) {
        //       listdata.push({
        //         x: i * 50,
        //         y: size + i * 10,
        //         name: arr[i],
        //         symbolSize: size,
        //         category: n,
        //         draggable: "true",
        //       });
        //     }
        //   }

        //   function setLinkData(arr, title) {
        //     for (var i = 0; i < arr.length; i++) {
        //       links.push({
        //         source: arr[i],
        //         target: title,
        //         lineStyle: {
        //           normal: {
        //             color: "source",
        //           },
        //         },
        //       });
        //     }
        //   }

        //   var legendes = ["生产", "销售", "运输", "电商沙盘"];
        //   var texts = [];
        //   for (var i = 0; i < legendes.length; i++) {
        //     texts.push({
        //       name: legendes[i],
        //     });
        //   }

        //   var cat1 = ["生产"];
        //   for (var i = 0; i < meds.length; i++) {
        //     cat1.push(meds[i]);
        //   }
        //   var cat2 = ["销售"];
        //   for (var i = 0; i < opes.length; i++) {
        //     cat2.push(opes[i]);
        //   }
        //   var cat3 = ["运输"];
        //   for (var i = 0; i < ches.length; i++) {
        //     cat3.push(ches[i]);
        //   }
        //   var cat4 = [];
        //   cat4.push(diease);

        //   setData(cat1, 0);
        //   setData(cat2, 1);
        //   setData(cat3, 2);
        //   setData(cat4, 3);

        //   setLinkData(cat1, cat1[0]);
        //   setLinkData(cat2, cat2[0]);
        //   setLinkData(cat3, cat3[0]);
        //   setLinkData(legendes, cat4[0]);

        //   var option = {
        //     title: {
        //       text: "关联知识点",
        //       top: "top",
        //       left: "left",
        //       textStyle: {
        //         fontSize: 15,
        //         color: "#f7f7f7",
        //       },
        //     },
        //     tooltip: {
        //       formatter: "{b}",
        //     },
        //     toolbox: {
        //       show: true,
        //       feature: {
        //         restore: {
        //           show: true,
        //         },
        //         saveAsImage: {
        //           show: true,
        //         },
        //       },
        //     },
        //     backgroundColor: "#00000",
        //     animationDuration: 1000,
        //     animationEasingUpdate: "quinticInOut",
        //     series: [
        //       {
        //         name: "知识图谱",
        //         type: "graph",
        //         layout: "force",
        //         force: {
        //           repulsion: 60,
        //           gravity: 0.1,
        //           edgeLength: 10,
        //           layoutAnimation: true,
        //         },
        //         data: listdata,
        //         links: links,
        //         categories: texts,
        //         roam: false,
        //         label: {
        //           normal: {
        //             show: true,
        //             position: "inside",
        //             formatter: "{b}",
        //             fontSize: 10,
        //             fontStyle: "600",
        //           },
        //         },
        //         lineStyle: {
        //           normal: {
        //             opacity: 0.9,
        //             width: 1.5,
        //             curveness: 0,
        //           },
        //         },
        //       },
        //     ],
        //   };
        //   // var option = {
        //   //   ...
        //   // };
        //   chart.setOption(option);
        //   return chart;
        // }

        /**
         * 初始化数据
         */
        // function initData(that) {
        //   inputVal = "";

        //   msgList = [
        //     {
        //       speaker: "server",
        //       contentType: "text",
        //       content: "您好，请问有什么可以帮助的吗？",
        //     },
        //   ];
        //   that.setData({
        //     msgList,
        //     inputVal,
        //   });
        // }
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {
        $(".scrolldiv")[0].scrollIntoView(false);
    }, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
/**index.wxss**/
/* page {
  background-color: #f1f1f1;
} */
.hddybody {
    background-color: #fff;
    border-right: 1px solid #ccc;
    /* border-radius: 10px; */
    overflow: hidden;
}

.inputRoom {
    width: 100%;
    height: 60px;
    border-top: 1px solid #cdcdcd;
    /* border-bottom: 1px solid #cdcdcd; */
    background-color: #f1f1f1;
    position: relative;
    bottom: 0px !important;
    display: flex;
    align-items: center;
    z-index: 20;
}

input {
    position: absolute;
    background-color: #fff;
    /* border-radius: 40rpx; */
    margin-right: 22px;
    padding: 0 10px;
    /* font-size: 28rpx; */
    color: #444;
    width: 100%;
    border: 0;
    height: 100%;
    background-color: #fff;
    /* margin-left: 22px; */
    padding: 0 10px;
    color: #444;
    border: none;
    outline: none;
}

.leftMsg {
    /* font-size: 16px; */
    color: #444;
    line-height: 25px;
    padding-right: 10px;
    padding-top: 6px;
    padding-left: 10px;
    background-color: #f7f5f6;
    margin-left: 10px;
    border-radius: 5px;
    z-index: 10;
    position: relative;
    font-size: 14px;
}

.scrolldiv {
    width: 72%;
}

.rightMsg {
    /* font-size: 16; */
    color: #fff;
    line-height: 30px;
    /* height: 50px; */
    /* padding: 10px 20px; */
    padding-right: 10px;
    padding-top: 6px;
    padding-left: 10px;
    background-color: #53e1be;
    text-align: left;
    margin-right: 0vw;
    border-radius: 5px;
    z-index: 10;
    position: relative;
    font-size: 14px;
}

/* .leftMsg::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
  top: 10px;
  left: -10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 15px solid #f7f5f6;
} */

/* .rightMsg::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;

  top: 10px;
  right: -10px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #53e1be;
} */

.monitor {
    font-size: 30rpx;
    text-align: center;
    padding-top: 2.5vh;
    padding-bottom: 2.5vh;
    color: #444;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: rgb(219, 219, 219);
}

.monitor text::before {
    content: "";
    position: absolute;
    margin-left: -8vw;
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
}

#nice text::before {
    background-color: rgb(0, 225, 0);
}

#bad text::before {
    background-color: red;
}

.guide {
    position: absolute;
    width: 370px;
    top: 20px;
    right: -418px;
    z-index: 100;
    /* background-color: rgb(241, 241, 241); */
}

/* .guide view {
  font-size: 25rpx;
  text-align: center;
  line-height: 6vh;
  height: 6vh;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
  border-bottom: 1px solid #dbdbdb;
} */

.guide button {
    font-size: 30rpx;
    text-align: center;
    width: 80% !important;
    background-color: rgb(205, 209, 209);
    height: 5vh !important;
    line-height: 2vh;
}

.move-view {
    position: absolute;
    height: 70rpx;
    width: 70rpx;
    padding: 10rpx;
    background-color: #ffffff;
    border-radius: 50%;
    z-index: 999;
}

.enter {
    position: absolute;
    width: 50px !important;
    /* height: 35px !important; */
    /* bottom: 20px; */
    right: 30px;
}

.img {
    height: 70rpx;
    width: 70rpx;
}

.container1 {
    height: 400px;
    width: 360px;
    float: right;
    left: -25px;
}

.startYuyinImage {
    position: fixed;
    top: 350rpx;
    left: 50%;
    width: 190rpx;
    height: 220rpx;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 20rpx;
    color: #fff;
    text-align: center;
    margin-left: -95rpx;
}

.startYuyinImage cover-image {
    margin: 30rpx auto;
    width: 100rpx;
    height: 100rpx;
}

.startYuyinImage cover-view {
    margin-top: 25rpx;
}

.tipQuestion {
    transition: all 0.2s;
}

.tipQuestion:hover {
    background-color: #eee !important;
    transform: scale(1.2);
}

.el-loading-mask {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 80px;
}
</style>
