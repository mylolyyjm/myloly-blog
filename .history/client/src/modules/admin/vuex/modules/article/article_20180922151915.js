import * as types from '../../mutation-types';
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
    tag_list: [],
}

const getters = {
    tag_list: state => state.tag_list,
    gg: state => state.tag_list
}

const mutations = {
    [types.CREATE_ARRTICLE](state, article_content) {
        state.article = article_content;
    },
    [types.GET_ALL_TAGS](state, tag_list) {
        console.log(tag_list);
        
        state.tag_list = tag_list;
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
    },
    async getAllTags({ commit, state }) {
        return await axios.get('/api/tags').then(res => {
            console.log(res.data.tag_list);
            commit(types.GET_ALL_TAGS, res.data.tag_list);
        })
    }
}
export default {
    state,
    mutations,
    actions,
}