const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    userId: String,
    title: String,
    content: String,
    createTime: {
        type: Date,
        Default: Date.now
    },
    editTime: {
        type: Date,
        Default: Date.now
    },
    viewCount: {
        type: Number,
        Default: 0
    },
    comment: {
        type: Array,
        Default: []
    }
})

module.exports = mongoose.model('article', articleSchema, 'article')
