const model = require('./../model/model')

let getArticleById = function(_id) {
  return new Promise((resolve, reject) => {
    model.Article.findOne()
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
  getArticleById: getArticleById
}

module.exports = articleDao
