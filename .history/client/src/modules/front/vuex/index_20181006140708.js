import Vue from 'vue';
import vuex from 'vuex';
import article from './module/'
Vue.use(Vuex);


export default new Vuex.Store({
    module: {
        article,
    }
})