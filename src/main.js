// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import MyHttpServer from './plugins/http'
import moment from 'moment'
import MyBread from './components/cuscom/myBread'
/*大家都要用的东西我们都要在main.js中去引入*/

Vue.config.productionTip = false

// Vue.use()是Vue插件的用法，axios不是Vue插件，不能用use
Vue.use(ElementUI)
Vue.use(MyHttpServer)

// 全局过滤器 --处理时间
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

// 全局自定义组件 (全局组件，在哪里都可以用)
Vue.component(MyBread.name,MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
