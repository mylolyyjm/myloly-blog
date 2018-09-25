import * as types from '../../mutation-types';
import axios from 'axios';
const state = {
    article: {
        title: '',
        content: '',
        abstract: '',
        image_url: '',
        // tags: '',
        publish: '',
    }
}

const mutations = {
    [types.CREATE_ARRTICLE](state, article_content) {
        state.article = article_content;
    },
}

const actions = { // tags
    async createArticle({ commit, state }, { title, content, abstract, image_url, publish }) {
        await this.axios.post('/api/createArticles', { title, content, abstract, image_url, publish }).then((res) => {
            console.log(res);
            
        });
    }
}
export default {
    state,
    mutations,
    actions,
}