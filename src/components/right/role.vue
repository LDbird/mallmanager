<template>
    <el-card>
      <!--面包屑-->
      <myBread level1="权限管理" level2="角色列表"></myBread>
      <el-button type="success" plain style="float: left;margin: 20px 0 0 10px">添加角色</el-button>
      <!--表格-->
      <el-table
        :data="roleList"
        style="width: 100%;line-height: 45px">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1,index) in scope.row.children" :key="index">
              <!--一级权限-->
              <el-col :span="4">
                <!--传 角色id 和 权限id-->
                <el-tag closable @close="delRight(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row  v-for="(item2,index) in item1.children" :key="index">
                  <!--二级权限-->
                  <el-col :span="4">
                    <el-tag @close="delRight(scope.row,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>

                  <el-col :span="20">
                    <el-tag @close="delRight(scope.row,item3.id)" closable type="warning" v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!--无权限提示-->
            <span v-if="scope.row.children.length === 0">未分配权限</span>
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
                @click="showSetUserRole(scope.row)"
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

      <!--修改权限的对话框-->
      <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
       <!--
        树形结构
        data->数据源[]
        show-checkbox->选择框
        node-key->每个节点的唯一标识 通常是data数据源中key名id
        default-expanded-keys->默认展开[要展开的节点id]
        default-checked-keys->[要选择的节点id]
        props->配置项{label,children}
        label节点的文字标题;children节点的子节点
        label和children的值都来源于数据源中的该数据的key名'label'和'children'

        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"

        default-expanded-all 一行代码搞定default-expanded-keys三层嵌套
       -->
        <el-tree
          ref="tree"
          :data="treeList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="arrexpand"
          :default-checked-keys='arrcheck'
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
          <el-button type="primary" @click="setRoleRight()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
    export default {
        name: "role",
        data(){
          return{
            roleList:[],
            dialogFormVisibleRight:false,
            // 树形结构的数据
            treeList: [],
            defaultProps: {
              children: 'children',
              label: 'authName'
            },

            // 所有层级下的权限id
            arrexpand:[],
            // 该角色的权限id
            arrcheck:[],

            // 当前角色id
            curRoleId:-1
          }
        },
      created() {
          this.getRoleList();
      },
      methods:{
        // 获取角色列表
        async getRoleList(){
          // 请求后台数据
          const res = await this.$http.get('roles');
          // console.log(res);
          this.roleList = res.data.data;

        },

        // 删除权限
        async delRight(role,rightId){
          // 请求路径：roles/:roleId/rights/:rightId
          /*
          * roleId=>角色id
          * rightId=>权限id*/
          const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
          console.log(res);
          const {meta:{msg,status},data} = res.data;
          if(status === 200){
            // 删除成功=>更新视图=>弹框提示
            // 更新整个视图(没有必要)=>优化=>可以只更新当前角色的权限即可
            // 删除成功，就返回200和该角色的剩余权限
            role.children = res.data.data;
            // this.getRoleList();
            this.$message.success(msg);
          }else {
            this.$message.error(msg);
          }
        },

        // 修改/分配 权限 - 打开对话框
        async showSetUserRole(role){
          // 给curRoleId赋值
          this.curRoleId = role.id;

          this.dialogFormVisibleRight = true;
          const res = await this.$http.get(`rights/tree`);
          console.log(res);
          this.treeList = res.data.data;
          console.log(this.treeList);

          // 把所有层级的权限id都获取到放到数组arrexpand中
          var arrtemp1 = [];
          this.treeList.forEach(item1=>{
            arrtemp1.push(item1.id);
            item1.children.forEach (item2=>{
              arrtemp1.push(item2.id);
              item2.children.forEach(item3=>{
                arrtemp1.push(item3.id);
              })
            })
          });
          // console.log(arrtemp1);
          this.arrexpand = arrtemp1;

          // 获取当前角色的权限id
          var arrtemp2 = [];
          role.children.forEach(item1=>{
            // arrtemp2.push(item1.id);
            item1.children.forEach(item2=>{
              // arrtemp2.push(item2.id);
              item2.children.forEach(item3=>{
                arrtemp2.push(item3.id)
              })
            })
          });
          console.log(arrtemp2);
          this.arrcheck = arrtemp2;
        },

        // 修改当前角色的权限
        async setRoleRight(){
          // 请求路径：roles/:roleId/rights
          // rids 树形节点中所有全选和半选的label的id []
          // roleId 当前要修改权限的角色id

          // 在js中调用el-tree方法==>this.$refs.tree.方法名
          // 获取全选和半选的id的数组==>element-ui提供的方法
          // getCheckedKeys(全选)   getHalfCheckedKeys(半选)
          let arr1 = this.$refs.tree.getCheckedKeys();
          let arr2 = this.$refs.tree.getHalfCheckedKeys();
          // ES6=>扩展运算符
          let arr = [...arr1,...arr2];
          // console.log(arr1, arr2);
          // console.log(arr);

          const res = await this.$http.post(`roles/${this.curRoleId}/rights`,{rids:arr.join(',')});
          // console.log(res);
          // 更新视图=>关闭对话框
          this.getRoleList();
          this.dialogFormVisibleRight = false;
        }
      }
    }
</script>

<style scoped>

</style>
