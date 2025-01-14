<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  mounted() {
    console.log(localStorage.getItem("login") == "false");
    if (
      !localStorage.getItem("login") ||
      !localStorage.getItem("login") == "true"
    ) {
      this.$router.push("/login/gologin");
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  /* #nav {
    // padding: 30px;
    // .navigation {
    // }
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983 !important;
        .lists {
          background-color: #e2f7f4 !important;
        }
      }
    }
  } */
}
</style>
<style>
body {
  padding: 0;
  margin: 0 auto;
  width: 100%;
  /* height: 900px; */
  background-color: #f2f2f2;
}
#app {
  width: 1230px;
  margin: 0 auto;
  position: relative;
}
.logo {
  width: 150px;
  height: 150px;
}
.logo > img {
  width: 150px;
  height: 150px;
}
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}*/

/* .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
} */
/*
body > .el-container {
  margin-bottom: 40px;
} */
</style>