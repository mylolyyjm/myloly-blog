import * as $ from '../../controllers/tagController.js';
import verify from '../../middleware/verify.js';

export default async(router) => {
    router
        .post('/tags', $.createTag)
        .get('/tags', $.getAllTags)
        .patch('/tags/:id', verify, $.updateTag)
        .delete('/tags/:id', verify, $.deleteTag);
};
