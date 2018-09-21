import * as $ from '../../controllers/ossSignController';
console.log();

export default async (router) => {
    router
        .get('/getOssSign', $.setOssSign);
}