import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Axios from 'axios';
import routes from './router/index'
import App from './App.vue';
import mavonEditor from 'mavon-editor';
import ElementUI from 'element-ui';
import store from '../admin/';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(mavonEditor);
Vue.use(ElementUI);

Vue.prototype.axios = Axios;

const router = new VueRouter({
    routes,
})

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});