import App from '../App.vue';
const Index = resolve => require(['../pages/index.vue'], resolve);
const Article = resolve => require(['../pages/article.vue'], resolve);
const routes = [
    {
        path: '/',
        component: App,
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index
    },
    {
        path: '/article/:id',
        component: Article
    }
];
export default routes;