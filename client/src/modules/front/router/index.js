import App from '../app.vue';
import Index from '../pages/index.vue';

const routes = [
    {
        path: '/',
        component: App,
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index
    }
];
export default routes;