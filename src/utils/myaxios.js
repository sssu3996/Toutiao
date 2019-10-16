// 实现 axios 的封装
// 引入axios
import axios from 'axios'
import { Toast } from 'vant'

// 设置默认地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('baseurl', axios.defaults.baseURL)

// 暴露 axios
export default axios

// 添加请求拦截
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前：将token以请求头的方式传递给服务器，服务器进行当前的token进行处理
    // console.log(config)
    const token = localStorage.getItem('toutiaocase1')
    // 将token通过请求头发送到浏览器
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做操作
    if (response.data && response.data.message === '用户信息验证失败') {
      Toast.fail(response.data.message)
      setTimeout(() => {
        // 通过浏览器的方式实现重定向
        window.location = '#/login'
      }, 1000)
    }
    return response
  },
  function (error) {
    // 对响应错误做操作
    return Promise.reject(error)
  }
)
