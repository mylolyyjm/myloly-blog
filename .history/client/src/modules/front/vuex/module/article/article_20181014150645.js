import * as types from '../../mutation-types';
import axios from 'axios';
const state = {
    tag_list: [],
    article: {
        id: '',
        title: '',
        content: '',
        abstract: '',
        image_url: '',
        // tags: '',
        publish: '',
    },
    article_list: [],
}

const mutations = {
    [types.GET_ARTICLE_BY_ID](state, article_content) {
        state.article = article_content;
    },
    [types.GET_ALL_ARTICLES](state, article_list) {
        stete.article_list = article_list;
    },
}

const actions = {
    async getAllArticle({ commit, state }) {
        return await axios.get('/api/articles').then((res) => {
            return new Promise((resolve, reject) => {
                if (res.data.success) {
                    commit(types.GET_ALL_ARTICLES, res.data.articleArr)
                    resolve(res.data.articleArr);
                }
                
            })
        });
    },
    async getArticleById({ commit, state }, id) {
        return await axios.get(`/api/article/${id}`).then((res) => {
            return new Promise((resolve, reject) => {
                resolve(res);
            })
        });
    },
    async getAllTags({ commit, state }) {
        return await axios.get('/api/tags').then(res => {
            commit(types.GET_ALL_TAGS, res.data.tag_list);
        })
    }
}
export default {
    state,
    mutations,
    actions,
}