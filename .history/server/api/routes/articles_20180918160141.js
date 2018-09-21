import * as $ from '../../controllers/articleController.js';
import verify from '../../middleware/verify.js';

export default async(router) => {
    router
        .get('/articles', $.getAllArticles)
        .get('/publishArticles', $.getAllPublishedArticle)
        .get('/articles/:id', $.getArticle)
        .post('/articles', $.createArticle)
        .patch('/articles/:id', $.updateArticle)
        .delete('/articles/:id', $.deleteArticle);
};
