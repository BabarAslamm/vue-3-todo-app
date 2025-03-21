import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import TasksPage from '@/pages/TasksPage.vue';
import SummaryPage from '@/pages/SummaryPage.vue'

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
        name: 'tasks'
    },
    {
        path: '/summary',
        component: SummaryPage,
        name: 'summary'
    }
];

export default routes;