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
        tags: '',
        publish: '',
    },
}

const getters = {
    taglist: state => state.tag_list,
}

const mutations = {
    [types.CREATE_ARRTICLE](state, article_content) {
        state.article = article_content;
    },
    [types.GET_ALL_TAGS](state, tag_list) {
        state.tag_list = tag_list;
    },
}

const actions = { // tags
    async createArticle({ commit, state }, send_data) {
        return await axios.post('/api/createArticles', send_data).then((res) => {
            return new Promise((resolve, reject) => {
                resolve(res);
            })
        });
    },
    async getArticleById(context, id) {
        return await axios.get(`/api/article/${id}`).then((res) => {
            return new Promise((resolve, reject) => {
                resolve(res);
            })
        });
    },
    async createTag({ commit, state }, { name }) {
        return await axios.post('/api/createTag', { name }).then((res) => {
            return new Promise((resolve, reject) => {
                resolve(res);
            });
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