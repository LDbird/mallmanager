import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Users from '../components/users/users'
import Right from '../components/right/right'
import Role from '../components/right/role'
import {Message} from "element-ui";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name:'login',
      path:'/login',
      component:Login
    },
    {
      name:'home',
      path:'/',
      component:Home,
      children:[
        {
          name:'users',
          path:'users',
          component:Users
        },
        {
          name:'right',
          path:'/rights',
          component:Right
        },
        {
          name:'roles',
          path:'/roles',
          component:Role
        },

      ]
    }
  ]
})

// 在路由配置生效之前 同意判断token
// 路由/导航 守卫
// 路由守卫 在路由配置生效之前
router.beforeEach((to,from,next)=>{
  // to 到哪去；from 从哪来；next 自动调用下一个中间件
  // console.log(to, from);
  // 如果要去的是登录 -> next()
  // 如果要去的不是登录 -> 判断有没有token
  if(to.path === '/login'){
    next();
  }else {
    const token = localStorage.getItem('token');
    if (!token){ // 如果没有token
      // 提示回到登录页
      Message.warning('请先登录');
      // this.$router.push({name:'login'})
      router.push({name:'login'});
      return;
    }
    next();
  }
})
export default router

