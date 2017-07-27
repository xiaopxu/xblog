const model = require('./../model/model')

//根据id获取文章
function getArticleById(_id) {
    return new Promise((resolve, reject) => {
        model.Article
            .findOne()
            .where('_id').equals(_id)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

//获取所有文章
function getAllArticle() {
    return new Promise((resolve, reject) => {
        model.Article
            .find()
            .where('publish').equals(true)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

//新建文章
function addArticle(newData) {
    let article = new model.Article({
        userId: newData.userId,
        title: newData.title,
        content: newData.content,
        createTime: new Date()
    })
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

//保存文章
function saveArticle(newData) {
    return new Promise((resolve, reject) => {
        model.Article.update({ '_id': newData._id }, { 'content': newData.content, 'title': newData.title }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//发布文章
function publishArticle(_id) {
    return new Promise((resolve, reject) => {
        model.Article.update({ '_id': _id }, { 'publish': true }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//取消发布
function unpublishArticle(_id) {
    return new Promise((resolve, reject) => {
        model.Article.update({ '_id': _id }, { 'publish': false }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

//删除文章
function deleteArticle(_id) {
    return new Promise((resolve, reject) => {
        model.Article.remove()
            .where('_id').equals(_id)
            .exec((err, data) => {
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
    saveArticle: saveArticle,
    publishArticle: publishArticle,
    unpublishArticle: unpublishArticle,
    deleteArticle: deleteArticle
}

module.exports = articleDao