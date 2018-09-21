import * as $ from '../../controllers/tokenController';

export default async router => {
    $.initUser;
    router.post('/token', $.login);
}