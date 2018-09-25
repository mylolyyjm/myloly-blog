import types from '../../mutation-types';
const state = {
    article: {
        title,
        content,
        abstract,
        image_url,
        // tags,
        publish,
    }
}

const mutations = {
    [types.CREATE_ARRTICLE](state, article_content) {
        state.article = article_content;
    },
}

const actions = {
    createArticle({ commit, state }, state) {
        commit(types.CREATE_ARRTICLE, state.article);
    }
}