import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
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
      path: '/dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
        path:'/customer',
        component: () => import("@/views/Customer.vue"),
    },
    {
      path: '/template',
      component: () => import("@/views/Template.vue")
    },
    {
      path: '/debt',
      component: () => import("@/views/Debt.vue")
    },
    {
      path: '/customer/:customerId/debt',
      component: () => import("@/views/CustomerDebt.vue")
    }
  ],
})
