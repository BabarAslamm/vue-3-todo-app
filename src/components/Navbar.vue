<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container py-2">
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <span>Toedoe</span>
                <strong>List</strong>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link :to="{name: 'tasks' }" class="nav-link">Tasks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'summary' }" class="nav-link">Summary</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <button type="button" @click="logout" class="btn btn-outline-secondary ms-2">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const store = useAuthStore();

const logout = async () => {
    try {
        await store.handleLogout();
        router.push({ name: 'login' });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
</script>