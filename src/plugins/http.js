// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  // axios.defaults.baseURL = 'http://3.112.132.86:8878/api/private/v1/'
  axios.defaults.baseURL = 'http://www.xiaomadagege.cn:8888/api/private/v1/'

  // 在请求发起之前，要设置头部 ==> axios拦截器 ==> axios文档
  // 添加axios请求拦截器==>在发起请求是就会触发该拦截器
  axios.interceptors.request.use(function (config) {
    console.log('拦截器触发');
    console.log(config); // config
    if (config.url !== 'login'){
      console.log('kiki');
      const AUTH_TOKEN = localStorage.getItem('token');
      // 设置请求头，使用token认证
      config.headers['Authorization'] = AUTH_TOKEN;
    }
    return config;
  },function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })
  // 添加响应拦截器
  // axios.interceptors.response.use(function () {
  //
  // }, function (error) {
  //   // 对响应错误做点什么
  //   return Promise.reject(error);
  // })

  // 4. 添加实例方法
  Vue.prototype.$http = axios;
}

export default MyHttpServer
