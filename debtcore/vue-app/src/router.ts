import { createRouter, createWebHistory}from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

import { useAuthStore } from '@/store/user'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*', // This will match all paths not matched by earlier routes
      name: 'NotFound',
      component: import('@/views/404.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/login',
      name:'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { hideNavigation: true, requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },
    {
      path:'/customer',
      name: 'customer',
      component: () => import("@/views/Customer.vue"),
    },
    {
      path: '/template',
      name: 'template',
      component: () => import("@/views/Template.vue")
    },
    {
      path: '/message',
      name: 'message',
      component: () => import("@/views/Message.vue"),
    },
    {
      path: '/debt',
      name: 'debt',
      component: () => import("@/views/Debt.vue")
    },
    {
      path: '/connections',
      name: 'connections',
      component: () => import("@/views/Connections.vue")
    },
    {
      path: '/user',
      name: 'name',
      component: () => import("@/views/User.vue")
    },
    {
      path: '/company',
      name: 'company',
      component: () => import ("@/views/Company.vue")
    },
    {
      path: '/usage-report',
      name: 'usage_report',
      component: () => import ("@/views/UsageReport.vue")
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import ("@/views/Setup.vue")
    },
    {
      path: '/customer/:customerId/debt',
      name: 'customerdebt',
      component: () => import("@/views/CustomerDebt.vue")
    },
  ],
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const auth = useAuthStore()
  const isAuthenticated = auth.isAuthenticated
  const requiresAuth = to.meta.requiresAuth ?? true

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
    return;
  } 


  if (to.name === 'login' && isAuthenticated) {
    next({ name: 'home' });
    return;
  }
  
  next()
});

export default router;