<template>
    <el-card>
      <!--面包屑-->
      <myBread level1="权限管理" level2="权限列表"></myBread>

      <!--表格-->
      <el-table
        :data="rightList"
        border
        style="width: 100%; line-height: 45px">
        <el-table-column
          type="index"
          label="#"
          width="60">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level==='0'">一级</span>
            <span v-if="scope.row.level==='1'">二级</span>
            <span v-if="scope.row.level==='2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
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
          // 请求路径：rights/:type
          const res = await this.$http.get(`rights/list`);
          console.log(res);
          this.rightList = res.data.data;
          console.log(this.rightList);
        }
      }
    }
</script>

<style scoped>
  .el-table{
    margin-top: 20px;
  }
  .has-gutter{
    height: 45px;
    overflow: hidden;
  }
</style>
