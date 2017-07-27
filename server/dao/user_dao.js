const model = require('./../model/model')

//根据id获取用户
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

//根据用户名获取用户
let getUserByUserName = function(userName) {
    return new Promise((resolve, reject) => {
        model.User.findOne()
            .where('userName').equals(userName)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
    })
}

//添加用户
let addUser = function(userName, password) {
    const user = new model.User({
        userName: userName,
        password: password,
        regTime: new Date()
    })
    return new Promise((resolve, reject) => {
        user.save((err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const userDao = {
    getUserById: getUserById,
    getUserByUserName: getUserByUserName,
    addUser: addUser
}

module.exports = userDao