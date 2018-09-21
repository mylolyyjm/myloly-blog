import * as $ from '../../controllers/ossSignController';

export default (router) => {
    router
        .get('/getOssSign', $.setOssSign());
}