// 封装axios
// 默认配置项
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'

})

// 请求拦截器
instance.interceptors.request.use(config => {
  // config 请求配置对象
  // 修改config
  const user = window.sessionStorage.getItem('tt')
  if (user) {
    config.headers = {
      Authorization: 'Bearer' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// 当请求服务端的接口时 响应的状态吗时401 token失效 重新登录即可
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  // 如果响应状态码时401 拦截到登录页面
  // error.response.status 状态码
  if (error.response.status === 401) {
    // hash 时location提供获取地址 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
