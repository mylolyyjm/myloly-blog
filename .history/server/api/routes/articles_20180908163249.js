import * as $ from '../../controllers/articleController.js';
import verify from '../../middleware/verify.js';

export default async(router) => {
    router
        .get('/articles', verify, $.getAllArticles)
        .get('/publishArticles', $.getAllPublishedArticle)
        .get('/articles/:id', $.getArticle)
        .post('/articles', verify, $.createArticle)
        .patch('/articles/:id', verify, $.updateArticle)
        .delete('/articles/:id', verify, $.deleteArticle);
};
