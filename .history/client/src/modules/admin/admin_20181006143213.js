import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import routes from './router/index'
import App from './App.vue';
import mavonEditor from 'mavon-editor';
import ElementUI from 'element-ui';
import store from './vuex/index';

Vue.use(VueRouter);
Vue.use(mavonEditor);
Vue.use(ElementUI);

Vue.prototype.axios = Axios;

const router = new VueRouter({
    routes,
})

new Vue({
    el: '#app',
    mode: 'history',
    store,
    router,
    template: '<App/>',
    components: { App }
});