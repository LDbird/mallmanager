<template>
  <el-card class="box-card">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索-->
    <el-row class="search-row">
      <el-col class="search-inp">
          <el-input
            @clear="loadUserList"
            clearable
            placeholder="请输入内容"
            v-model="query"
            class="input-search">
            <el-button
              @click="searchUser"
              slot="append"
              icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain @click="showAddUser">添加用户</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table
      :data="userList"
      height="400px"
      border
      style="width: 100%;line-height: 45px">
      <el-table-column
        type="index"
        label="#"
        width="60"
        height="46">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80"
        height="46">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>

      <!--如果单元格内显示的内容不是字符串(文本),需要给被现实的内容外层包裹一个template小容器-->
      <el-table-column
        label="创建日期">
        <!--template内部要用数据 设置slot-scope属性,
          该属性的值要用数据(create_time)的数据源(userList)
          userList.row->数组中的每个对象
        -->
        <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>

      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMsgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              @click="showEditUser(scope.row)"
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              circle></el-button>
            <el-button
              size="mini"
              plain
              @click="showSetUserRole(scope.row)"
              type="success"
              icon="el-icon-check"
              circle></el-button>
            <el-button
              @click="showDelUserMsgBox(scope.row.id)"
              size="mini"
              plain
              type="danger"
              icon="el-icon-delete"
              circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--添加用户-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑用户对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px" >
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--分配用户角色对话框-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
        {{curUserName}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!--如果select的绑定的数据的值和option的value一样，
          就会显示该option的label值-->
          <el-select v-model="curRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="(item,i) in roleAry" :key="i" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
    export default {
      name: "users",
      data(){
          return{
            query:'',
            userList: [], // 表格绑定的数据
            
            // 分页相关的数据
            total:0,
            pagenum:1,
            pagesize:2,

            // 添加对话框的属性
            dialogFormVisibleAdd:false,
            // 添加用户表单数据
            form:{
              username:'',
              password:'',
              email:'',
              mobile:''
            },

            // 编辑对话框属性
            dialogFormVisibleEdit:false,

            // 分配角色对话框属性
            dialogFormVisibleRole:false,
            curRoleId:-1,
            curUserName:'',
            roleAry:[], // 存放用户所有的角色

            // 当前用户id
            curUserId:-1

            // 当前user的id
            // curUserId:-1
          }
      },
      created(){
        this.getUserList();
      },
      methods:{
        // 获取用户列表的请求
       async getUserList(){
         const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
         console.log(res);
         const {meta:{status,msg},data:{users,total}} = res.data;
         if(status === 200){
           // 给表格数据赋值=>给总数赋值(分页)=>提示用户获取数据成功
           this.userList = users;
           // console.log(users);
           this.total = total;
           this.$message.success(msg)
         }else {
           this.$message.success(msg)
         }
       },

        // 分页相关的方法
        handleSizeChange(val) {
          this.pagesize = val;
          this.pagenum = 1;
          this.getUserList();
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.pagenum = val;
          this.getUserList();
          console.log(`当前页: ${val}`);
        },

        // 搜索用户
        searchUser(){
         // 按照input绑定query的值进行搜索
         this.getUserList();
        },

        // 清空搜索框重新获取数据
        loadUserList(){
         this.getUserList();
        },

        // 添加用户-显示对话框
        showAddUser(){
         this.form = {};
         this.dialogFormVisibleAdd = true;
        },

        // 添加用户-发送请求
        async addUser(){
          const res = await this.$http.post(`users`,this.form);
          console.log(res);
          const {meta:{status,msg},data} = res.data;
          if (status === 201){
            // 提示成功 => 关闭对话框 => 更新视图 => 清除文本框
            this.$message.success(msg);
            this.getUserList();
            this.form = {};
            this.$message.warning('用户添加成功');
          }else {
            this.$message.warning('用户添加失败');
          }
          this.dialogFormVisibleAdd = false;
        },

        // 删除用户-打开一个消息盒子
        showDelUserMsgBox(userId){
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            // 发送删除请求: id==>用户id
            // =>data中找userId
            // =>吧userId以showDelUserMsgBox参数的形式传进来
            const res = await this.$http.delete(`users/${userId}`);
            console.log(res);
            // console.log(userId);
            if (res.data.meta.status === 200){
              // 回到首页
              this.pagenum = 1;
              // 更新视图
              this.getUserList();
              // 提示删除成功
              this.$message({
                type: 'success',
                message: res.data.meta.msg
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        // 显示编辑用户对话框
        showEditUser(user){
         this.form = user;
         // 获取用户数据
         this.dialogFormVisibleEdit = true;
        },

        // 确定编辑用户--发送请求
        async editUser(){
         // user/:id
          const res = await this.$http.put(`users/${this.form.id}`,this.form);
          console.log(res,11111);
          // 关闭对话框=>更新视图
          this.getUserList();
          this.dialogFormVisibleEdit = false;
        },

        // 改变用户状态
        async changeMsgState(user){
         // 发送请求
         const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
         console.log(res);
        },

        // 用户分配角色
        async showSetUserRole(user){
         this.curUserId = user.id;
         // 一打开对话框，显示当前用户的用户名和角色名
          this.curUserName = user.username;

          // 获取所有的角色,动态生成el-option
          const res1 = await this.$http.get(`roles`);
          console.log(res1);
          this.roleAry = res1.data.data;

          // 获取当前用户角色id;返回结果中,rid就是当前用户的角色id
          const res = await this.$http.get(`users/${user.id}`);
          // console.log(res);
          // 获取当前用的角色id=>rid
          this.curRoleId = res.data.data.rid;
          // 分配角色的打开对话框
          this.dialogFormVisibleRole = true;
        },

        // 分配角色
        async setRole(){
         const res = await this.$http.put(`users/${this.curUserId}/role`,{
           rid:this.curRoleId
         });
          console.log(res);
          this.dialogFormVisibleRole = false
        }
      }
    }
</script>

<style scoped>
  .box-card{
    height: 100%;
  }
  .input-search{
    width: 500px;
  }
  .search-row{
    float: left;
  }
  .search-inp{
    height: 90px;
    line-height: 90px;
  }
</style>
