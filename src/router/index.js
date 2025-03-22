import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active'
});

router.beforeEach((to, from)=>{
    
    if(to.path === '/tasks'){

        return { name: 'login' }
    }

})

export default router;