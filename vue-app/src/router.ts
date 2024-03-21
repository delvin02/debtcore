import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { hideNavigation: true },
    },
    {
        path:'/vendor',
        component: () => import("@/views/VendorView.vue"),
    }
  ],
})
