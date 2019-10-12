// 实现 axios 的封装
// 引入axios
import axios from 'axios'

// 设置默认地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 暴露 axios
export default axios
