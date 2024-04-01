import { createRouter, createWebHistory } from 'vue-router'
import { user } from './main'; 

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
      path: '/message',
      component: () => import("@/views/Message.vue"),
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


router.beforeEach(async (to, from, next) => {
  
  const isAuthenticated = user.isAuthenticated;


  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' }); // Adjust as necessary
  } else {
    next(); // proceed to route
  }

});

export default router;