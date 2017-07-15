const model = require('./../model/model')

/**
 * 根据key获取登陆记忆数据
 * @param {string} rememberKey 保存在客户端cookie的key
 * @returns {promise}
 */
function findRememberByKey(rememberKey) {
  return new Promise((resolve, reject) => {
    model.LoginRemember.findOne()
      .where('rememberKey').equals(rememberKey)
      .exec((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

/**
 * 根据key获取登陆记忆数据
 * @param {string} userId 用户id
 * @returns {promise}
 */
function findRememberByUserId(userId) {
  return new Promise((resolve, reject) => {
    model.LoginRemember.findOne()
      .where('userId').equals(userId)
      .exec((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

/**
 * 添加登陆记忆数据 
 * @param {object} newData 新数据 
 * @returns {promise}
 */
function addRemember(newData) {
  let loginRemember = new model.LoginRemember({
    userId: newData.userId,
    rememberKey: newData.rememberKey,
    ipAddress: newData.ipAddress
  })
  return new Promise((resolve, reject) => {
    loginRemember.save((err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function delRememberByUserId(userId) {
  return new Promise((resolve, reject) => {
    model.LoginRemember.remove()
      .where('userId').equals(userId)
      .exec((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })

}

const loginRememberDao = {
  findRememberByKey: findRememberByKey,
  findRememberByUserId: findRememberByUserId,
  addRemember: addRemember,
  delRememberByUserId: delRememberByUserId
}

module.exports = loginRememberDao
