<template>
  <!--面包屑-->
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索-->
    <el-row class="search-row">
      <el-col class="search-inp">
          <el-input
            placeholder="请输入内容"
            v-model="query"
            class="input-search">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
    export default {
      name: "users",
      data(){
          return{
            query:''
          }
      }
    }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
  .input-search{
    width: 600px;
  }
  .search-row{
    margin-left: -500px;
  }
  .search-inp{
    height: 90px;
    line-height: 90px;
  }
</style>
