import App from '../App.vue';
const Admin = resolve => require(['../pages/admin.vue'], resolve);
const Login = resolve => require(['../pages/login.vue'], resolve);

const routes = [
    {
        path: '/',
        component: App,
        redirect: '/admin'
    },
    {
        path: '/admin',
        component: Admin,
    },
    {
        path: '/admin/login',
        component: Login,
    }

];
export default routes;