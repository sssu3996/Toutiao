// 这个文件专门用来处理与 users 相关的请求
import axios from '../utils/myaxios'

// 登录
export const login = data => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 注册
export const register = data => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
