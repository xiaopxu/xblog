const model = require('./../model/model')

function getArticleById(_id) {
    return new Promise((resolve, reject) => {
        model
            .Article
            .findOne()
            .where('_id')
            .equals(_id)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

function getAllArticle() {
    return new Promise((resolve, reject) => {
        model
            .Article
            .find()
            .where('publish')
            .equals(true)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

function addArticle(newData) {
    let article = new model.Article({userId: newData.userId, title: newData.title, content: newData.content, createTime: new Date()})
    return new Promise((resolve, reject) => {
        article.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function saveArticle(newData) {
    return new Promise((resolve, reject) => {
        model
            .Article
            .update({
                '_id': newData._id
            }, {
                'content': newData.content
            }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

const articleDao = {
    getArticleById: getArticleById,
    getAllArticle: getAllArticle,
    addArticle: addArticle,
    saveArticle: saveArticle
}

module.exports = articleDao
