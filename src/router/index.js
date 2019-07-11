import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Shou from '../views/Shou/shou.vue'
import Huan from '../views/welcome/huan.vue'
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
    }
  ]
})
export default router
