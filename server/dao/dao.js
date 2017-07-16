const articleDao = require('./article_dao')
const userDao = require('./user_dao')
const loginRememberDao = require('./login_remember_dao')

const dao = {
  articleDao: articleDao,
  userDao: userDao,
  loginRememberDao: loginRememberDao
}

module.exports = dao
