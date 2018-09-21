import Article from '../models/article';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import config from '../config/'

export async function createArticle(ctx) { // 新建文章，需传入title、content、abstract、tags、publish
    const title = ctx.request.body.title;
    const content = ctx.request.body.tcontent;
    const abstract = ctx.request.body.tabstract; // 摘要
    const tags = ctx.request.body.tags;
    const publish = ctx.request.body.publish;  
    const createTime = new Date();    
    const lastEditTime = new Date();
    if (!title) {
        ctx.throw(400, '文章标题不能为空');
    }
    if (!content) {
        ctx.throw(400, '文章内容不能为空');
    }
    if (!abstract) {
        ctx.throw(400, '摘要不能为空');
    }
    const article = new Article({
        title,
        content,
        abstract,
        tags,
        publish,
        createTime,
        lastEditTime,
    });
    let createResult = await article.save().catch(err => {
        ctx.throw('服务器错误');
    });
    await Article.populate(createResult, { path: 'tags' }, (err, result) => {
        createResult = result;
    });
    ctx.body = {
        success: true,
        article: createResult,
    };
}

export async function getAllArticles(ctx) { // 获取所有文章，需传入tag、page、limit
    console.log(ctx.request.query);
    
    const tag = ctx.request.query.tag;
    const page = +ctx.request.query.page || 1;
    const limit = +ctx.request.query.limit || 4;
    let total = 0;
    let pageNum = 0;
    let tagArr = [];
    let articleArr = []
    if (typeof Number(page) !== 'number') {
        ctx.throw(400, 'page必须为数字');
    }
    let skip = (page - 1) * limit;
    if (!tag) {
        articleArr = await Article.find()
        .populate('tags')
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip)
        .catch(err => {
            ctx.throw(500, '服务器错误');
        });
        total = await  Article.count().catch(err => {
            ctx.throe(500, '服务器错误');
        })
    } else {
        tagArr = tag.split(',');
        await Article.find({
            tags: { $in: tagArr }
        })
        .populate('tags')
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip)
        .catch(err => {
            ctx.throw(500, '服务器错误');
        });
        total = await Article.find({
            tags: { $in: tagArr }
        }).count().catch(err => {
            ctx.throw(500, '服务器错误');
        });
    }
    pageNum = Math.ceil(total / limit);
    ctx.body = {
        success: true,
        articleArr,
        pageNum,
        total,
    }
}
export async function getAllPublishedArticle(ctx) { // 获取全部已上架文章，需传入tag、page、limit
    const tag = ctx.request.query.tag;
    const page = +ctx.request.query.page || 1;
    const limit = +ctx.body.request.limit || 4;
    let total = 0;
    let tagArr = [];
    let articleArr = [];
    if (typeof Number(page) !== 'number') {
        ctx.throw(400, 'page必须为数字');
    }
    let skip = (page - 1) * limit;
    if (!tag) {
        articleArr = await Article.find({
            publish: true,
        })
        .populate('tags')
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip)
        .catch(err => {
            ctx.throw(500,'服务器错误');
        });
        total = await Article.find().count().catch(err => {
            ctx.throw(500, '服务器错误');
        })
    } else {
        tagArr = tag.split(',');
        articleArr = await Article.find({
            publish: true,
            tag: {$in: tagArr},
        })
        .populate('tags')
        .sort({ createTime: -1 })
        .limit(limit)
        .skip(skip)
        .catch(err => {
            ctx.throw(500, '服务器错误');
        });
        total = await Article.find({
            publish: true,
            tag: { $in: tagArr },
        }).catch(err => {
            ctx.throw(500, '服务器错误');
        });
    }
    pageNum = Math.ceil(total / limit);
    ctx.body = {
        success: true,
        articleArr,
        pageNum,
        total,
    };
}

export async function updateArticle(ctx) { // 根据id更新文章内容，需要传入id、content、title、abstrat
    const id = ctx.params.id;
    const content = ctx.body.request.content;
    const title = ctx.body.request.title;
    const abstract = ctx.body.request.abstract;
    if (!content) {
        ctx.throw(400, 'id不能为空');            
    }
    if (!title) {
        ctx.throw(400, '文章标题不能为空');            
    }
    if (!abstrat) {
        ctx.throw(400, '文章摘要不能为空');            
    }
    await Article.findByIdAndUpdate(id, {
        $set: ctx.request.body,
    }).catch(err => {
        if (err.name === 'CastName') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器错误');
        }
    });
    ctx.body = {
        success: true,
    };
}

export async function getArticle(ctx) { // 根据id获取文章
    const id = ctx.params.id;
    const article = await Article.findById(id).catch(err => {
        if (err.name === 'CastName') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器错误');
        }
    });
    ctx.body = {
        success: true,
        article,
    };
}

export async function deleteArticle(ctx) { // 根据id删除文章
    const id = ctx.params.id;
    await Article.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastName') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器错误');
        }
    });
    ctx.body = {
        success: true,
    };
}
export async function publishArticle(ctx) { // 根据id上架文章
    const id = ctx.params.id;
    const article = await Article.findByIdAndUpdate(id, { $set: { publish: true } }).catch(err => {
        if (err.name === 'CastError') {
            this.throw(400, 'id不存在');
        } else {
            this.throw(500, '服务器内部错误');
        }
    });
    ctx.body = {
        success: true,
    };
}

export async function notPublishArticle(ctx) { // 根据id下架文章
    const id = ctx.params.id;
    const article = await Article.findByIdAndUpdate(id, { $set: { publish: false } }).catch(err => {
        if (err.name === 'CastError') {
            this.throw(400, 'id不存在');
        } else {
            this.throw(500, '服务器内部错误');
        }
    });
    ctx.body = {
        success: true,
    };
}