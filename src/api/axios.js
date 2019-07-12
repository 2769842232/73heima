// 封装axios
// 默认配置项
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    Authorization: 'Bearer' + JSON.parse(window.sessionStorage.getItem('tt')).token
  }
})
export default instance
