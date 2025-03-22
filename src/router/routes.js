import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import TasksPage from '@/pages/TasksPage.vue';
import SummaryPage from '@/pages/SummaryPage.vue'
import NotFoundErrorPage from '@/pages/errors/NotFoundErrorPage.vue'

const routes = [
    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register'
    },
    {
        path: '/tasks',
        component: TasksPage,
        name: 'tasks',
        meta: {
            auth : true
        }
    },
    {
        path: '/summary',
        component: SummaryPage,
        name: 'summary'
    },
    {
        path: "/:notFound(.*)",
        component: NotFoundErrorPage,
        name: 'error.404'
    },
];

export default routes;