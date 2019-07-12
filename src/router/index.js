import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Shou from '../views/Shou/shou.vue'
import Huan from '../views/welcome/huan.vue'
// 完成404页面
import NotFound from '../views/404/index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'home', path: '/', redirect: '/login' },
    { name: 'login', path: '/login', component: Login },
    {
      name: 'shou',
      path: '/Shou',
      component: Shou,
      children: [
        { name: 'huan', path: '/Shou', component: Huan }
      ]
    },
    // 路由规则的最后
    // 路径走到这个位置 证明没有任何处理程序去处理这个路劲
    { path: '*', name: 'nofound', component: NotFound }
  ]
})
export default router
