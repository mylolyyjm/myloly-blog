import mongoose from 'mongoose';
import moment from 'moment';
moment.locale('zh-cn');
const Schema  = mongoose.Schema;
const articleSchema = new Schema({
    title: String,
    content: String,
    abstract: String,
    image_url: {
        type: String,
        default: 'https://article-images.oss-cn-beijing.aliyuncs.com/article/20180921114129236.jpg',
    },
    tags: {
        type: String,
        default
    },
    publish: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
        default: Date.now,
    },
    lastEditTime: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false });
articleSchema.set('toJSON', { getters: true, virtuals: true });
articleSchema.set('toObject', { getters: true, virtuals: true });
articleSchema.path('createTime').get(v =>{
    return moment(v).format('lll');
});
articleSchema.path('lastEditTime').get(v =>{
    return moment(v).format('lll');
});
module.exports = mongoose.model('article', articleSchema);