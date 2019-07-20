// 注册组件
// 目的 批量的全局注册组件 use的使用
// 封装插件
import MyBread from '../components/MyBread.vue'
// 封装频道信息
import MyChannel from '../components/my-channel.vue'
// 非父子传值
import Mycoma from './mycoma.vue'
import Mycomb from './mycomb.vue'

// 封装发布文章中的上传图片登
import MYImage from '../components/my-image.vue'
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

    // 封装发布文章中的上传图片登
    Vue.component(MYImage.name, MYImage)
    // 非父子传值练习
    Vue.component(Mycoma.name, Mycoma)
    Vue.component(Mycomb.name, Mycomb)
  }
}
