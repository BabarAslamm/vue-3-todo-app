import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login } from "@/http/auth-api";
import api from "@/http/api";


export const useAuthStore = defineStore('authStore', () => {
    // Initialize from localStorage
    const user = ref(JSON.parse(localStorage.getItem('user') || null));
    const token = ref(localStorage.getItem('auth_token') || null);

    const isLoggedIn = computed(() => !!token.value);

    const handleLogin = async (credentials) => {
      const { data } = await login(credentials);
      user.value = data.user;
      token.value = data.token;
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    };

    const handleLogout = () => {
      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    };

    return { user, token, isLoggedIn, handleLogin, handleLogout };

});