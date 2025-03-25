import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "@/stores/auth";



const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active'
});


router.beforeEach(async (to) => {
    const store = useAuthStore();

    // If token exists but store isn't initialized
    const token = localStorage.getItem('auth_token');
    if (token && !store.isLoggedIn) {
      store.token = token;
      try {
        await store.fetchUser(); // Add this method to your store
      } catch {
        store.handleLogout();
        return { name: 'login' };
      }
    }

    if (to.meta.auth && !store.isLoggedIn) {
      return {
        name: 'login',
        query: { redirect: to.fullPath },
      };
    }
  });

// router.beforeEach(async (to, from, next) => {
//     const store = useAuthStore();

//     // If we have a token but store isn't initialized, try to fetch user
//     if (localStorage.getItem('auth_token') && !store.isLoggedIn) {
//         try {
//             // Add a method in your authStore to fetch user data
//             await store.fetchUser();
//         } catch (error) {
//             // Token might be invalid, clear it
//             localStorage.removeItem('auth_token');
//             return next({ name: 'login' });
//         }
//     }

//     if (to.meta.auth && !store.isLoggedIn) {
//         return next({
//             name: 'login',
//             query: { redirect: to.fullPath },
//         });
//     }

//     return next();
// });



export default router;