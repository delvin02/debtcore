import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/user'
const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      path: '/customer/:customerId/debt',
      name: 'customerdebt',
      component: () => import("@/views/CustomerDebt.vue")
    }
  ],
})


// router.beforeEach((to, from, next) => {
//   const user = useAuthStore()
//   const isAuthenticated:boolean = user.isAuthenticated;


//   if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     next({ name: 'login' }); // Adjust as necessary
//   } else {
//     next(); // proceed to route
//   }

// });

export default router;