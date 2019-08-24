<template>
    <div class="login-wrap">
      <el-form
        class="login-form"
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" type="password"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return {
          labelPosition: 'top',
          formLabelAlign: {
            username: '',
            password: '',
          }
        }
      },
      methods:{
        // ES7新语法：async+await；就是让异步操作看起来像同步操作，这个新语法是generator的语法糖
        async handleLogin(){
          const res = await this.$http.post('login',this.formLabelAlign);
            // ***解构赋值***
            const {data,meta:{msg,status}} = res.data;
            if(status === 200){
              // >如果用户没登录，直接通过url标识来到home组件，这样是不可以的
              // >解决:在登录成功时，保存正确用户的token => localStorage.setItem('token',data.token)
              localStorage.setItem('token',data.token);
              this.$router.push({name:'home'});
              this.$message.success(msg);
            }else {
              this.$message.error(msg);
            }
        }
      }
    }
</script>

<style scoped>
.login-wrap{
  height: 100%;
  background: #324152;
  /*弹性盒子模型flex布局*/
  display: flex;
  justify-content: center;
  align-items: center;
}
  .login-wrap .login-form{
    width: 400px;
    background: white;
    border-radius: 5px;
    padding: 15px 30px;
  }
.login-wrap .login-btn{
  width: 100%;
}
</style>
