import Vue from 'vue';
import Vuex from 'vuex';
import article from './module/article/article'
Vue.use(Vuex);


export default new Vuex.Store({
    module: {
        article,
    }
})