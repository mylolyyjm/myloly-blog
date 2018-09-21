import * as $ from '../../controllers/ossSignController';
console.log($.setOssSign);

export default async (router) => {
    router
        .get('/getOssSign', $.setOssSign);
}