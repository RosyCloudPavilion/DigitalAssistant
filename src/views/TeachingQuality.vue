<template>
  <div class="kcjxzl">
    <!--条件栏-->
    <el-card class="box-card searchnav">
      <el-button-group style="width: 100%">
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple" style="text-align: left">
              <span style="font-size: 20px"
                ><strong>&nbsp;&nbsp;&nbsp;&nbsp;课程教学质量</strong></span
              >
            </div></el-col
          >
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="text-align: right">
              <el-form
                :model="form"
                :inline="true"
                class="demo-form-inline margintop"
              >
                <el-form-item label="选择实验：" prop="class">
                  <el-select
                    clearable
                    v-model="form.class"
                    placeholder="请选择实验"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button size="medium" @click="search" class="margintop1"
                  >搜索</el-button
                >
              </el-form>
            </div></el-col
          >
        </el-row>
      </el-button-group> </el-card
    ><br />
    <!--table表-->
    <el-card class="box-card" style="box-shadow: 0 0 0 0; border: 0">
      <!--表格1-->
      <template>
        <h2
          style="
            color: #333;
            text-align: left;
            font-size: 16px;
            border-left: 5px solid #38c3a1;
            padding-left: 5px;
          "
        >
          教学质量综合分数
        </h2>
        <el-table
          :data="tableData"
          border
          :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
          style="width: 100%; margin: auto"
        >
          <el-table-column type="index" width="62" align="center">
          </el-table-column>
          <!--<el-table-column
                    align="center"
                    prop="times"
                    label="创建时间"
                    width="200"
                    :formatter="formatDate">
            </el-table-column>-->
          <el-table-column
            align="center"
            prop="q1"
            label="实验轮次"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q2"
            label="学生表现"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q3"
            label="老师表现"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q4"
            label="综合质量分数"
            width="252"
          >
          </el-table-column>
          <!-- </el-table-column> -->
        </el-table>
      </template>
      <!--2-->
      <template>
        <h2
          style="
            color: #333;
            text-align: left;
            font-size: 16px;
            border-left: 5px solid #38c3a1;
            padding-left: 5px;
          "
        >
          学生课堂表现
        </h2>
        <el-table
          :data="tableData2"
          border
          :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
          style="width: 100%; margin: auto"
        >
          <el-table-column type="index" width="62" align="center">
          </el-table-column>
          <!--<el-table-column
                        align="center"
                        prop="times"
                        label="创建时间"
                        width="200"
                        :formatter="formatDate">
                </el-table-column>-->
          <el-table-column
            align="center"
            prop="q1"
            label="实验轮次"
            width="120"
          >
          </el-table-column>
          <el-table-column align="center" prop="q2" label="到课率" width="140">
          </el-table-column>
          <el-table-column align="center" prop="q3" label="抬头率" width="140">
          </el-table-column>
          <el-table-column align="center" prop="q4" label="互动度" width="140">
          </el-table-column>
          7<el-table-column align="center" prop="q5" label="理解度" width="140">
          </el-table-column>
          <el-table-column
            align="center"
            prop="q6"
            label="知识掌握度图谱"
            width="172"
          >
          </el-table-column>
        </el-table>
      </template>
      <!--3-->
      <template>
        <h2
          style="
            color: #333;
            text-align: left;
            font-size: 16px;
            border-left: 5px solid #38c3a1;
            padding-left: 5px;
          "
        >
          老师表现
        </h2>
        <el-table
          :data="tableData3"
          border
          :header-cell-style="{ background: '#f9f9f9', color: '#606266' }"
          style="width: 100%; margin: auto"
        >
          <el-table-column type="index" width="62" align="center">
          </el-table-column>
          <!--<el-table-column
                        align="center"
                        prop="times"
                        label="创建时间"
                        width="200"
                        :formatter="formatDate">
                </el-table-column>-->
          <el-table-column
            align="center"
            prop="q1"
            label="实验轮次"
            width="162"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q2"
            label="授课时长占比"
            width="185"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q3"
            label="互动时长占比"
            width="160"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q4"
            label="情感心理状态"
            width="185"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="q5"
            label="课堂氛围"
            width="160"
          >
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      options: [],
      tableData: [
        {
          q1: "1",
          q2: ">81",
          q3: "93",
          q4: "87",
        },
        {
          q1: "2",
          q2: ">60",
          q3: "92",
          q4: "76",
        },
        {
          q1: "3",
          q2: ">73",
          q3: "89",
          q4: "81",
        },
      ],
      tableData2: [
        {
          q1: "1",
          q2: "75%",
          q3: "85%",
          q4: "67%",
          q5: "34%",
          q6: "+4%",
        },
      ],
      tableData3: [
        {
          q1: "1",
          q2: "32%",
          q3: "45%",
          q4: "优",
          q5: "优",
        },
        {
          q1: "2",
          q2: "36%",
          q3: "42%",
          q4: "良",
          q5: "良",
        },
      ],
      form: {
        class: "",
      },
    };
  },

 
  methods: {
    //学校（实验室）
    // xx() {
    // let _this = this;
    // let newArr = [];
    // $.ajax({
    //   type: "GET",
    //   url: "https://www.mylittlefox.art/api/hudongdayi/Experiment/getList",
    //   dataType: "json",
    //   success: function (result) {
    //     for (var i = 0; i < result.length; i++) {
    //       var label = result[i].name;
    //       var value = result[i].id;
    //       var ss = {
    //         value: value,
    //         label: label,
    //       };
    //       newArr.push(ss);
    //     }

    //     _this.options = newArr;
    //   },
    //   error: function () {},
    // });
    // },
    //时间格式化方法
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property];
      if (data == null) {
        return null;
      }
      let dt = new Date(data);
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
      );
    },
    // getTableData() {
    //   let th = this;
    //   th.$http({
    //     //调用接口
    //     method: "GET",
    //     url: "https://cnodejs.org/api/v1/topics", //this指data
    //   }).then(
    //     function (response) {
    //       //接口返回数据
    //     },
    //     function (error) {}
    //   );
    // },
    search() {
      
    },
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