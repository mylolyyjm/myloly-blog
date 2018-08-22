import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Axios from 'axios';
import routes from './router/index'
import App from './app.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
}).mount('#app');