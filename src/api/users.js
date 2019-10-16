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

// 获取当前登录用户的个人信息
export const getPersonalInfo = id => {
  return axios({
    // 将token以请求头的方式传递给服务器，服务器可以根据当前的token进行处理
    // headers: {
    //   // Authorization 由后台决定
    //   Authorization: localStorage.getItem('toutiaocase1')
    // },
    url: `/user/${id}`
  })
}

// 更新用户的数据
export const updatePersonalInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 获取用户关注列表
export const getUserFocus = () => {
  return axios({
    url: '/user_follows'
  })
}

// 取消关注
export const cancelUserFocus = id => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
