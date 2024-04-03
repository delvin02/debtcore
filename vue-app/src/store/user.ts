import { defineStore } from 'pinia';
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
      user: null, 
      access_token: null,
      refresh_token: null 
  }),
  getters: {
      isAuthenticated: (state: AuthState) => !!state.user, // Corrected type here
      getUser: (state: AuthState) => state.user // Corrected type here
  },
  actions: {
      async init() {
          // Make sure to check for null and handle it appropriately
          const accessToken = localStorage.getItem('access_token');
          if (accessToken) {
              this.access_token = accessToken;
              this.refresh_token = localStorage.getItem('refresh_token');

              // Assuming `user` should be an object, not directly assigning string values
              this.user = {
                  id: localStorage.getItem('user.id') || '',
                  name: localStorage.getItem('user.name') || '',
                  email: localStorage.getItem('user.email') || ''
              };
              await this.refresh_user_token();
          }
      },
      set_token(data: { access: string; refresh: string }) {
          this.access_token = data.access;
          this.refresh_token = data.refresh;

          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh); 
      },
      remove_token() {
          this.user = null;
          this.access_token = null;
          this.refresh_token = null;

          localStorage.clear(); // Simplified clearing localStorage
      },
      set_user_info(user: User) {

          // Directly assigning user object after validating it
          if (user) {
              this.user = { ...user };

              localStorage.setItem('user.id', user.id);
              localStorage.setItem('user.name', user.name);
              localStorage.setItem('user.email', user.email);
          }

      },
      async refresh_user_token() {
        const drfCsrf = JSON.parse(document.getElementById('drf_csrf')?.textContent || '{}')

        try {
          const response = await axios.post('/api/refresh', {
            refresh: this.refresh_token
          }, {
            headers: {
              [drfCsrf.csrfHeaderName]: drfCsrf.csrfToken
            }
          });
          this.access_token = response.data.access; // Assuming 'access' is the correct property name
          localStorage.setItem('access_token', response.data.access);
          // Update axios defaults with the new token
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.access_token}`;
        } catch (error) {
          console.error(error);
          this.remove_token(); // Ensure this method correctly handles token removal and user logout
        }
      }
  }
});
