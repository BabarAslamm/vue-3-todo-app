import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/stores/auth";



const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active'
});

router.beforeEach((to, from)=>{
    const store = useAuthStore();
    // Retrieve token from localStorage if available
    const token = localStorage.getItem('auth_token');

    if (token) {
        store.token = token;
    }

    if(to.meta.auth && !store.isLoggedIn){

        return {
            name: 'login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }

    }



})

export default router;