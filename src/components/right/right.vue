<template>
    <el-card>
      <!--面包屑-->
      <myBread level1="权限管理" level2="权限列表"></myBread>

      <!--表格-->

    </el-card>
</template>

<script>
    export default {
      name: "right",
      data(){
        return {
          rightList:[]
        }
      },
      created() {
        this.getRightList();
      },
      methods:{
        async getRightList(){
          // 除了登录之外的所有请求，都要设置头部
          const res = await this.$http.get('rights/list');
          console.log(res);
          this.rightList = res.data.data;
        }
      }
    }
</script>

<style scoped>

</style>
