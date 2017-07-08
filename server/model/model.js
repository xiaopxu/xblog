const mongoose = require('mongoose')
const Schema = mongoose.Schema
const allUserSchema = new Schema({
    userName: String,
    password: {
        type: String,
        Default: '96E79218965EB72C92A549DD5A330112'
    },
    email: String,
    profilePic: String,
    regTime: {
        type: Date,
        Default: Date.now
    }
})

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

const Models = {
    User: mongoose.model('allUser', allUserSchema, 'allUser'),
    Article: mongoose.model('article', articleSchema, 'article')
}

module.exports = Models