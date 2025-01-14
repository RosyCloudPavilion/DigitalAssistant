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

    <el-table :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        " style="width: 100%; margin-top: 0px">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="班级名称" prop="name"> </el-table-column>
        <el-table-column label="人数" prop="date"> </el-table-column>
        <el-table-column label="描述" prop="address"> </el-table-column>
        <el-table-column align="right">
            <template slot-scope="scope" slot="header">
                <el-input v-model="search" size="mini" placeholder="输入班级名称  关键字搜索" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

  
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {

    components: {},
    data() {
        return {
            tableData: [{
                    name: "电子商务",
                    date: "10",
                    address: "人机交互电子商务实验室",
                },
                {
                    date: "16",
                    name: "信息工程",
                    address: "信息工程",
                },
                {
                    date: "12",
                    name: "软件工程",
                    address: "软件工程",
                },
                {
                    date: "5",
                    name: "网络空间安全",
                    address: "网络空间安全",
                },
            ],
            search: "",
        };
    },

    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
            this.tableData.splice(index, 1);
        },


    },
};
</script>
  
<style>
  </style>
