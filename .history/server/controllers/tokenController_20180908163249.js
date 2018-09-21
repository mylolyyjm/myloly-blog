import User from '../models/user';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from '../config';

export async function initUser () {
    let user = await User.find().exec().catch(err => {
        console.log(err);
    });
    if (user.length === 0) {
        user = new User({ // 更改用户名密码
            name: 'hjm',
            username: config.admin.user,
            password: md5(config.admin.pwd).toUpperCase(),
            avatar: '',
            createTime: new Date(),
        });
    }
    await user.save().catch(err => {
        console.log(err);
    });
}

export async function login (ctx) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    let user = await User.findOne({
        username,
    }).exec();
    if (user) {
        if (user.password === password) {
            const token = jwt.sign({
                uid: user._id,
                name: user.name,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 一小时
            }, config.jwt.secret);
            ctx.body = {
                success: true,
                uid: _id,
                name: user.name,
                token: user.token,
            };
        } else {
            ctx.throw(401, '密码错误');
        }
    } else {
        ctx.throw(401, '用户名错误');
    }
}