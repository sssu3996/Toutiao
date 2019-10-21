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
export const sendComments = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 搜索文章
export const searchArticals = keyword => {
  return axios({
    url: '/post_search?keyword=' + keyword,
    keyword
  })
}

// 热门搜素
export const hotSearch = keyword => {
  return axios({
    url: '/post_search_recommend?keyword=' + keyword,
    keyword
  })
}
