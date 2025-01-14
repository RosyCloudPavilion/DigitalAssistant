<!--  -->
<template>
<!--用户名密码进行登录后台-->
<el-form ref="form" class="backgroundGoLogin">
    <div class="login-title">数字助教</div>
    <p style="margin-bottom: 60px; font-size: 14px">当前页面</p>
    <!-- 输入用户名栏 -->

    <router-link to="/login/tologin">
        <el-button style="
          width: 290px;
          height: 46px;
          font-size: 20px;
          color: #fff;
          font-weight: 700;
          background-color: #38c3a1;
          border: 0;
        " type="primary">进入登录
        </el-button>
    </router-link>

</el-form>
</template>

<script>
export default {
    name: "GoLogin",
    components: {},
    data() {
        return {
            otherRender: "#1A7BCF",
            signVisible: false,
        };
    },
    mounted: function () {
        this.otherRender = "";
    },
    methods: {},
    computed: {},
};
</script>

<style scoped>
.backgroundGoLogin {
    padding: 60px;
    margin-top: -160px;
    margin-left: 20px;
    /* height: 150px; */
    border-radius: 15px;
    width: 280px;
    height: 400px;
    background-color: #fff !important;
}

.login-title {
    margin-top: 110px;
    font-size: 28px;
    color: black;
    margin-bottom: 20px;
}

.el-button {
    width: 100px;
}
</style>
