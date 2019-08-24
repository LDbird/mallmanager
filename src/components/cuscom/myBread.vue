<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        name: "myBread",
      data(){
          return{

          }
      },

      // props 值字符串数组
      // props中的值得用法和data数据的用法一样
      // props中的数据的值 来源于使用组件是传的值
      // props中的数据也是该组件的属性
      props:[
        'level1',
        'level2'
      ]
    }
</script>

<style scoped>

</style>
