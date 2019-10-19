// 关于文章数据的请求
import axios from '../utils/myaxios'

// get 的时候必须用params包裹参数
export const getArticals = params => {
  return axios({
    url: '/post',
    params
  })
}

// 获取文章详情
export const getArticalsById = id => {
  return axios({
    url: `/post/${id}`
  })
}

// 点赞文章
export const likeArticals = id => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 获取评论列表
export const getcommentsList = id => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 收藏文章
export const starArticals = id => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 发布评论
export const sendComments = id => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`
  })
}
