const model = require('./../model/model')

let getUserById = function(_id) {
  return new Promise((resolve, reject) => {
    model.User.findOne()
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

const userDao = {
  getUserById: getUserById
}

module.exports = userDao
