import { defineStore } from 'pinia'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import router from '@/router'

interface User {
	id: string
	name: string
	email: string
	company_id: string
	company_name: string
}

interface UserAuthenticateResponse {
	access: string
	refresh: string
}

interface ApiResponse {
	user: User
	is_admin: Boolean
}

interface AuthState {
	user: User | null
	is_admin: Boolean
	access_token: string | null
	refresh_token: string | null
	is_loading: Boolean
}

// const router = useRouter();

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => ({
		user: null,
		is_admin: false,
		access_token: null,
		refresh_token: null,
		is_loading: false
	}),
	getters: {
		isAuthenticated: (state: AuthState) => !!state.user,
		getUser: (state: AuthState) => state.user,
		getUsername: (state: AuthState) => state.user?.name
	},
	actions: {
		async init() {
			// Make sure to check for null and handle it appropriately
			const accessToken = localStorage.getItem('access_token')
			if (accessToken) {
				this.access_token = accessToken
				this.refresh_token = localStorage.getItem('refresh_token')

				// Assuming `user` should be an object, not directly assigning string values
				this.user = {
					id: localStorage.getItem('user.id') || '',
					name: localStorage.getItem('user.name') || '',
					email: localStorage.getItem('user.email') || '',
					company_id: localStorage.getItem('user.company_id') || '',
					company_name: localStorage.getItem('user.company_name') || ''
				}
			}
			await this.refresh_user_token()
			await this.get_user()
		},
		async login(email: string, password: string) {
			const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
			try {
				const response = await axios.post(
					'/api/login',
					{
						email: email,
						password: password
					},
					{
						headers: {
							'Content-Type': 'application/json',
							[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
						}
					}
				)

				this.set_token(response.data)
				axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access
				await this.get_user()
				return null
			} catch (error: unknown) {
				if (axios.isAxiosError(error)) {
					// Now TypeScript knows this is an AxiosError, you can access error.response safely
					const errorMessage =
						error.response?.request.statusText || 'An error occurred during login.'
					return errorMessage
				}
				return 'An unexpected error occurred.'
			}
		},
		async get_user() {
			await axios
				.get('/api/me/', {
					headers: {
						Accept: 'application/json'
					}
				})
				.then((response: AxiosResponse<ApiResponse>) => {
					this.set_user_info(response.data.user)
					this.is_admin = response.data.is_admin
				})
				.catch((error: any) => {
					if (error.response.status === 401) {
						this.remove_token()
						this.redirectToLogin()
					} else {
						// Show an error toast
						console.log('error', error)
					}
				})
		},
		set_token(data: UserAuthenticateResponse) {
			this.access_token = data.access
			this.refresh_token = data.refresh

			localStorage.setItem('access_token', data.access)
			localStorage.setItem('refresh_token', data.refresh)
		},
		remove_token() {
			this.user = null
			this.access_token = null
			this.refresh_token = null

			localStorage.clear() // Simplified clearing localStorage
		},
		set_user_info(user: User) {
			// Directly assigning user object after validating it
			if (user) {
				this.user = { ...user }

				localStorage.setItem('user.id', user.id)
				localStorage.setItem('user.name', user.name)
				localStorage.setItem('user.email', user.email)
				localStorage.setItem('user.company_id', user.company_id)
				localStorage.setItem('user.company_name', user.company_name)
			}
		},
		async refresh_user_token() {
			const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')

			try {
				const response = await axios.post(
					'/api/refresh',
					{
						refresh: this.refresh_token
					},
					{
						headers: {
							[drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
						}
					}
				)

				this.access_token = response.data.access
				localStorage.setItem('access_token', response.data.access)
				axios.defaults.headers.common['Authorization'] = `Bearer ${this.access_token}`
			} catch (error) {
				console.error(error)
				this.remove_token()
			}
		},
		redirectToLogin() {
			router.push('/login')
		}
	}
})
