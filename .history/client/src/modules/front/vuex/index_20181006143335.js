import Vue from 'vue';
import vuex from 'vuex';
import article from './module/article/article'
Vue.use(vuex);


export default new Vuex.Store({
    module: {
        article,
    }
})