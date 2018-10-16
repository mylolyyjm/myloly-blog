import * as $ from '../../controllers/tagController.js';
import verify from '../../middleware/verify.js';

export default async(router) => {
    router
        .post('/createTag', $.createTag)
        .get('/tags', $.getAllTags)
        .patch('/tags/:id', $.updateTag)
        .delete('/tags/:id', verify, $.deleteTag);
};
