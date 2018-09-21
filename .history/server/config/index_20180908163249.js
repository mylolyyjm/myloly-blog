import fs from 'fs';
let config = {
    app: {
        port: process.env.PORT || 8889,
        baseApi: '/api',
    },
    mongodb: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/KOA'
    },
    jwt: {
        secret: 'me', // 用于加密时混淆
    },
    mongodbSecret: {
        user: '',
        pass: '',
    },
    admin: {
        user: 'admin',
        pwd: '123456',
    },
    disqus: {
        url: '',
    },
    baidu: { // 百度统计
        url: '',
    },
};
console.log(config);
export default config;
