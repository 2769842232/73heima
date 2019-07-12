// 封装axios
// 默认配置项
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})
// 请求拦截器
instance.interceptors.request.use(config => {
  const user = window.sessionStorage.getItem('tt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
