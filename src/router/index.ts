/**
  ts版本路由
  2022年6月22
*/
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from '../components/Layout.vue'
import Login from '../components/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),// 默认hash模式
  routes
})



export default router