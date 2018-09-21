import Tag from '../models/tag';
import article from '../models/article';

export async function createTag(ctx) {
    const tagName = ctx.request.body.name;
    if (!tagName) {
        ctx.throw(400, '标签名不能为空');
    }
    const tag = await Tag.findOne({ name: tagName }).catch(err => {
        ctx.throw(500, '服务器错误');
    });
    if (tag) {
        ctx.body = {
            success: false,
            message: '标签已存在',
            tag: tag,
        };
        return false;
    }
    const newTag = new Tag({
        name: tagName,
    });
    const result = await newTag.save().catch(err => {
        ctx.throw(500, '服务器错误');
    })
    ctx.body = {
        success: true,
        tag: result,
    }
}

export async function getAllTags(ctx) {
    const tag_list = await Tag.find().catch(err => {
        ctx.throw(500, '服务器错误');
    });
    ctx.body = {
        success: true,
        tag_list,
    };
}

export async function updateTag(ctx) {
    const id = ctx.params.id;
    const name = ctx.request.body.name;
    if (!name) {
        ctx.throw(400, '标签不能为空');
    }
    const tag = await Tag.findByIdAndUpdate(id, { $set: { name: name } })
    .catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器错误');
        }
    });
    ctx.body = {
        success: true,
    };
}

export async function deleteTag(ctx) {
    const id = ctx.request.body.id;
    const tag = Tag.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastName') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器错误 ');
        }
    });
    ctx.body = {
        success: true,
    }
}
