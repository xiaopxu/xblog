const articleDao = require('./article_dao')
const userDao = require('./user_dao')
const loginRememberDao = require('./loginRememberDao')

const dao = {
  articleDao: articleDao,
  userDao: userDao,
  loginRememberDao: loginRememberDao
}

module.exports = dao
