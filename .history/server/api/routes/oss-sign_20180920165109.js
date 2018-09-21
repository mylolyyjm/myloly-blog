import * as $ from '../../controllers/ossSignController';

export default async (router) => {
    router
        .post('/getOssSign', $.setOssSign);
}