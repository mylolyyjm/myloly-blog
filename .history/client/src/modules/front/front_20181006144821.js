import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Axios from 'axios';
import routes from './router/index'
import 'lib-flexible/flexible.js'

import App from '../front/App.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
    routes,
});

new Vue({
    el: '#app',
    mode: 'history',
    store,
    router,
    template: '<App/>',
    components: { App },
});