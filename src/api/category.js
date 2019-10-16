// 此文件处理项目列表请求
import axios from '../utils/myaxios'

export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
