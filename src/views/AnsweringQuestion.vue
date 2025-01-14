<!--  -->
<template>
<div class="hddy">
    <el-card class="box-card searchnav">
        <el-button-group style="width: 100%; height: 62px">
            <el-row :gutter="20">
                <el-col :span="6" style="width: 22%">
                    <div class="grid-content bg-purple" style="text-align: left">
                        <span style="font-size: 20px; padding-left: 5px"><strong>&nbsp;&nbsp;&nbsp;&nbsp;互动答疑</strong></span>
                    </div>
                </el-col>
                <router-link to="/answeringQuestion/answeringQuestionBody">
                    <div class="move-view" style="position: absolute; top: -10px; right: 20px">
                        <!-- <img class="img" src="../assets/icon-setting.png" /> -->
                    </div>
                </router-link>
            </el-row>
        </el-button-group>
    </el-card><br />
    <el-card class="box-card scrollView">
        <el-row :gutter="24" style="box-sizing: border-box" class="guidef">
            <router-view></router-view>
        </el-row>
    </el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象components中才能使用

}
</script>

<style scoped>
.searchnav {
    z-index: 0;
}

.img {
    height: 35px;
    width: 35px;
    /* position: f; */
}

.move-view {
    position: absolute;
    height: 35px;
    width: 35px;
    padding: 5px;
    background-color: #ffffff;
    border-radius: 50%;
    z-index: 999;
}

.scrollView {
    /* width: 55%; */
    padding: 20px;
    padding-top: 0;
    /* margin: auto; */
    margin-top: -10px;
    height: 695px;
    border: #ffffff;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 0);
}

.guidef {
    width: 58% !important;
}
</style>
