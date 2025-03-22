import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    routes,
    history: createWebHistory(),
    linkActiveClass: 'active'
});

router.beforeEach((to, from)=>{

    // if(to.path === '/tasks'){

    //     return { name: 'login' }
    // }

    if(to.meta.auth){

        return {
            name: 'login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
        
    }



})

export default router;