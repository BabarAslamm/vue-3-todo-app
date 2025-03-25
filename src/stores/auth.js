import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login } from "@/http/auth-api";
import api from "@/http/api";


export const useAuthStore = defineStore('authStore', () => {

    const user = ref(null);
    const token = ref(null);

    const isLoggedIn = computed(() => !!user.value)

    const handleLogin = async (credentials) => {
        try {
            const { data } = await login(credentials);

            user.value = data.user;
            token.value = data.token;

            // Store token in localStorage or sessionStorage
            localStorage.setItem('auth_token', data.token);

        } catch (error) {

            console.error("Login failed:", error);
            throw error;

        }
    };


    return {
        user, token, isLoggedIn, handleLogin
    }
})