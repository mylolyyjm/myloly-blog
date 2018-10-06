import * as types from '../../mutation-types';
import Vue from 'vue';
import axios from 'axios';
const state = {
    article: {
        id: '',
        title: '',
        content: '',
        abstract: '',
        image_url: '',
        // tags: '',
        publish: '',
    },
    tag: {
        id: '',
        name: '',
    }
}

const mutations = {
    [types.GET_ALL_ARRTICLE](state, article_content) {
        state.article = article_content;
    },
    [types.CREATE_TAG](state, tag) {
        state.tag = tag;
    },
}

const actions = { // tags
    async createArticle({ commit, state }, { title, content, abstract, image_url, publish }) {
        return await axios.post('/api/createArticles', { title, content, abstract, image_url, publish }).then((res) => {
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
    }
}
export default {
    state,
    mutations,
    actions,
}