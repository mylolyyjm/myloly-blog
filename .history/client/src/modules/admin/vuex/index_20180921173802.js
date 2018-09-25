import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import article from './modules/article/article'
export default store = new Vuex.Store({
    modules: {
        article,
    }
})