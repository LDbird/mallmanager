<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../images/tx2.jpg" alt="">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="logout" href="">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  .container{
    height: 100%;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .header .grid-content img{
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  .middle{
    line-height: 60px;
  }
  .logout{
    text-decoration: none;
  }
</style>
