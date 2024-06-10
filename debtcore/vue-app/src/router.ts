import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useAuthStore } from '@/store/user'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/:pathMatch(.*)*', // This will match all paths not matched by earlier routes
			name: 'NotFound',
			component: import('@/views/404.vue'),
			meta: {
				title: `404 | DebtCore` 
			}
		},
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/LoginView.vue'),
			meta: { hideNavigation: true, requiresAuth: false,
			title: `Log in | DebtCore`  }
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue'),
			meta: { hideNavigation: true, requiresAuth: false,
			title: `Log in | DebtCore` 
		}
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('@/views/Dashboard.vue'),
			meta: {
				title: `Dashboard | DebtCore`
			}
		},
		{
			path: '/customer',
			name: 'customer',
			component: () => import('@/views/Customer.vue'),
			meta: {
				title: `Customer | DebtCore` 
			}
		},
		{
			path: '/template',
			name: 'template',
			component: () => import('@/views/Template.vue'),
			meta: {
				title: `Template | DebtCore` 
			}
		},
		{
			path: '/conversation',
			name: 'conversation',
			component: () => import('@/views/Conversation.vue'),
			meta: {
				title: `Conversation | DebtCore` 
			}
		},
		{
			path: '/debt',
			name: 'debt',
			component: () => import('@/views/Debt.vue'),
			meta: {
				title: `Debt | DebtCore` 
			}
		},
		{
			path: '/connections',
			name: 'connections',
			component: () => import('@/views/Connections.vue'),
			meta: {
				title: `Connections | DebtCore` 
			}
		},
		{
			path: '/connections/facebook',
			name: 'connections_facebook',
			component: () => import('@/views/ConnectionWhatsapp.vue'),
			meta: {
				title: `Connections | Facebook | DebtCore` 
			}
		},
		{
			path: '/user',
			name: 'name',
			component: () => import('@/views/User.vue'),
			meta: {
				title: `User | DebtCore` 
			}
		},
		{
			path: '/company',
			name: 'company',
			component: () => import('@/views/Company.vue'),
			meta: {
				title: `Company | DebtCore` 
			}
		},
		{
			path: '/usage-report',
			name: 'usage_report',
			component: () => import('@/views/UsageReport.vue'),
			meta: {
				title: `Usage Report | DebtCore` 
			}
		},
		{
			path: '/setup',
			name: 'setup',
			component: () => import('@/views/Setup.vue'),
			meta: {
				title: `Setup | DebtCore` 
			}
		},
		{
			path: '/session',
			name: 'session',
			component: () => import('@/views/Session.vue'),
			meta: {
				title: `Session | DebtCore` 
			}
		},
		{
			path: '/customer/:customer_id',
			name: 'customerdebt',
			component: () => import('@/views/CustomerDetail.vue'),
			meta: {
				title: `Customer Detail | DebtCore` 
			}
		}
	]
})


router.beforeEach(
	(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		const auth = useAuthStore()
		auth.is_loading = true
		try {
			const defaultTitle = 'DebtCore';
			const title = typeof to.meta.title === 'function' ? to.meta.title(to) : to.meta.title;
			document.title = title || defaultTitle;

			const isAuthenticated = auth.isAuthenticated
			const requiresAuth = to.meta.requiresAuth ?? true

			if (requiresAuth && !isAuthenticated) {
				next({ name: 'login' })
				return
			}

			if (to.name === 'login' && isAuthenticated) {
				next({ name: 'dashboard' })
				return
			}

			next()
		} catch (error) {
			console.log(error)
		} finally {
			auth.is_loading = false
		}

	}
)

export default router
