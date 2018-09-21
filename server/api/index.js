import compose from 'koa-compose';
import Router from 'koa-router';
import convert from 'koa-convert';
import config from '../config';
import requireDir from 'require-dir';
// 自动加载routes下地所有任务
const routes = requireDir('./routes');

export default function api () {
    const router = new Router({
        prefix: config.app.baseApi,
    });
    Object.keys(routes).forEach(name => {
        return routes[name]['default'](router);
    });
    return convert.compose([
        router.routes(),
        router.allowedMethods()
    ]);
}