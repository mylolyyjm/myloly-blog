import * as $ from '../../controllers/ossSignController.js';

export default async (router) => {
    router
        .get('/getOssSign', $.setOssSign);
}