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
            <a class="logout" @click="handleLogOut">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu
          :unique-opened="true"
          :router="true"
        >
          <el-submenu :index="item.order.toString()" :key="index" v-for="(item,index) in menus">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item1.path"
                :key="index"
                v-for="(item1,index) in item.children">
                <i class="el-icon-circle-check"></i>
                <span>{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "home",
      data(){
        return{
          menus:[]
        }
      },
      beforeCreate(){
          // const token = localStorage.getItem('token');
          // if (!token){
          //   this.$router.push({name:'login'})
          // }
      },
      created(){
        this.getMenus();
      },
      methods:{
        handleLogOut(){
          // 清除token=>返回到登录页面=>退出成功提示
          localStorage.removeItem('token');
          this.$message.success('退出成功');
          this.$router.push({name:'login'})
        },

        // 获取导航数据
        async getMenus(){
          const res = await this.$http.get(`menus`);
          console.log(res);
          this.menus = res.data.data;
        }
      }
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
    margin-left: -50px;
  }
  .middle{
    line-height: 60px;
  }
  .logout{
    text-decoration: none;
    cursor: pointer;
  }
  .el-menu{
    height: 100%;
  }
</style>
