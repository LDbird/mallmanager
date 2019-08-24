<template>
    <el-card>
      <!--面包屑-->
      <myBread level1="权限管理" level2="角色列表"></myBread>

      <!--表格-->
      <el-table
        :data="roleList"
        style="width: 100%;line-height: 45px">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1,index) in scope.row.children" :key="index">
              <!--一级权限-->
              <el-col :span="4">
                <el-tag>{{item1.authName}}</el-tag>
              </el-col>

              <el-col :span="20">
                <el-row  v-for="(item2,index) in item1.children" :key="index">
                  <!--二级权限-->
                  <el-col :span="4">
                    <el-tag>{{item2.authName}}</el-tag>
                  </el-col>

                  <el-col :span="20">
                    <el-tag v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="#"
          width="60"
          height="46">
        </el-table-column>
        <el-table-column
          label="角色名称"
          width="180"
          prop="roleName">
        </el-table-column>
        <el-table-column
          label="用户描述"
          width="180"
          prop="roleDesc">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle></el-button>
              <el-button
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle></el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
    export default {
        name: "role",
        data(){
          return{
            roleList:[]
          }
        },
      created() {
          this.getRoleList();
      },
      methods:{
        async getRoleList(){
          const res = await this.$http.get('roles');
          console.log(res);
          this.roleList = res.data.data;
        }
      }
    }
</script>

<style scoped>

</style>
