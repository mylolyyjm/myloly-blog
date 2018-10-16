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
}

const getters = {
    taglist: state => state.tag_list,
}

const mutations = {
    
}

const actions = {
    async getAllArticle({ commit, state }) {
        return await axios.get('/api/articles').then((res) => {
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