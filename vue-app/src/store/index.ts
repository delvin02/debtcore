import { defineStore } from 'pinia'
import axios from "axios"

export const useSideBarStore = defineStore('sidebar', {
    state: () => ({ collapsible: false }),
    getters: {
        isCollapsible: (state) => state.collapsible,
    },
    actions: {
        onCollapse(): void {
            this.collapsible = true
        },
        onExpand(): void {
            this.collapsible = false
        },
        toggleCollapsible(): boolean {
            return this.collapsible = !this.collapsible;
        }
    }
})

interface AuthState {
    user: any; 
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null
    }),
    getters: {
        isAuthenticated: (state: AuthState) => !!state.user,
        getUser: (state: AuthState) => state.user
    },
    actions: {
        async init() {
            try {
                const response = await axios.get('/api/session-status', { withCredentials: true });
                if (response.data.isAuthenticated) {
                    this.login(response.data.user);
                } else {
                    // Optionally handle the case where isAuthenticated is false
                    this.logout(); // For example, ensure user state is clean
                }
            } catch (error) {
                console.error('Error fetching session status:', error);
                // Handle errors, e.g., by logging out the user or showing an error message
                this.logout(); // Ensures the user state is clean on error
            }
        },
        login(user: any) {
            this.user = user
        },
        async logout() {
            try {
                const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')
                const headers = {
                    'Content-Type': 'application/json',
                    [drfCsrf.csrfHeaderName]: drfCsrf.csrfToken,
                };
                // Await the axios call to complete
                const response = await axios.post('/api/user/logout', {}, { 
                    withCredentials: true,
                    headers: headers
                });
                
                // Check for successful response status
                if (response.status === 200) {
                    this.user = null;
                    return true
                } else {
                    console.error('Logout failed with status:', response.status);
                    return false
                }
            } catch (error) {
                console.error('Error during logout:', error);
                return false
            }
        }
    }
})