// 关于文章数据的请求
import axios from '../utils/myaxios'

// get 的时候必须用params包裹参数
export const getArticals = params => {
  return axios({
    url: '/post',
    params
  })
}
