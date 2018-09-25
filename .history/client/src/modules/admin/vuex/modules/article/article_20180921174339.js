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
        await axios.post('/api/createArticles', { title, content, abstract, image_url, publish }).then((res) => {
            if (res.data.success) {
                this.$message.success('success');
            } else {
                this.$message.error = res.data.message;
            }
        });
    },
    async cerateTag() {
        
    }
}
export default {
    state,
    mutations,
    actions,
}