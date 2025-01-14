<!--  -->
<template>
<div class="background">

    <div class="logo-text">
        <span>高瞩科技 &emsp;<span>|</span>&ensp; &nbsp; 数字助教</span>
    </div>

    <div style="text-align: center">
        <el-row style="opacity: 1">
            <div class="center">
                <el-container style="width: 400px" class="container">
                    <el-main style="">
                        <br /><br /><br /><br /><br /><br /><br /><br />
                        <router-view></router-view>
                    </el-main>

                </el-container>
            </div>
        </el-row>
        <!--注册弹框-->
    </div>
</div>
</template>

<script>
export default {
    name: "Login",
}
</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    z-index: -10;
    zoom: 1;
    /* background-color: #fff; */
    /* background: url("") no-repeat; */
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    /* background-image: linear-gradient(to left, #fff, rgb(175, 243, 232)); */
    background-image: url("../assets/beijing.gif");
}

.container {
    position: relative;
    width: 550px !important;
}

.el-dialog__wrapper {
    left: -150px;
    top: 65px !important;
    width: 760px !important;
    height: 700px !important;
}

.login-title {
    margin-top: -150px;
    margin-bottom: 80px;
    width: 100% !important;
    font-size: 26px !important;
    /* color: #fff !important; */
    text-align: center !important;
}

.el-dialog__body {
    height: 435px !important;
}

.inputlogin .el-input__inner {
    text-align: left;
    /* background-color: #6997d2; */
    border-color: #666;
    margin-left: -20px !important;

    color: #ccc;
    width: 270px;
}

.el-form-item__label {
    /* color: #fff; */
    width: 103px !important;
    text-align: left;
    font-size: 16px !important;
    /* margin-right: 10px; */
}

.el-form-item__content {
    margin-left: 103px !important;
    width: 250px;
}

/*div居中*/
.center {
    -webkit-transform: translateX(-50%) translateY(-50%);
    position: fixed;
    top: 35%;
    transform: translate(-50% -50%);
    left: 47%;
    /* background-color: #000; */
    width: 300px;
    height: 40%;
}

.logo-text {
    height: 60px;
    z-index: -10;
    display: inline;
    overflow: hidden;
}

.logo-text>span {
    line-height: 60px;
    position: absolute;
    top: 20px;
    left: 80px;
    /* left: 200px; */
    font-size: 26px;
    text-shadow: 5px 5px 5px #000;
    color: #fff;
}
</style>
