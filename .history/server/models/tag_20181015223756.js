import mongoose from 'mongoose';
import { version } from 'core-js';

const Schema = mongoose.Schema;
const tagSchema = new Schema({
    name: {
        type: Array,
        default: []
    },
}, { versionKey: false });
tagSchema.set('toJSON', { getters: true, virtuals: true });
tagSchema.set('toObject', { getters: true, virtuals: true });

module.exports = mongoose.model('tag', tagSchema);

