const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        Default: ''
    },
    content: {
        type: String,
        Default: ''
    },
    publish: {
        type: Boolean,
        Default: false
    },
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
