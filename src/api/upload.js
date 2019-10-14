// 处理文件上传请求

import axios from '../utils/myaxios'

export const uploadfile = data => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
