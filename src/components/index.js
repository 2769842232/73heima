// 注册组件
// 目的 批量的全局注册组件 use的使用
// 封装插件
import MyBread from '../components/MyBread.vue'
// 封装频道信息
import MyChannel from '../components/my-channel.vue'
// 封装成插件的形式 Vue.use (插件)执行插件的配置对象中install函数且传入Vue对象
export default {
  install (Vue) {
    // 注册所有组件再Vue下
    // 提前定义好的组件名, 然后是组件选项
    // Vue.component('my-bread', MyBread)
    // 组件过多的话可以根据name来注册组件 只为了方便
    Vue.component(MyBread.name, MyBread)
    // 封装频道信息
    Vue.component(MyChannel.name, MyChannel)
  }
}
