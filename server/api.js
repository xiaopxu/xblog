const express = require('express')
const router = express.Router()
const db = require('./db')
const model = require('./model/model')
const mongoose = require('mongoose')
const md5 = require('md5')
const getLocalIp = require('./utils/get_ip')
const articleDao = require('./dao/article_dao')
const userDao = require('./dao/user_dao')

//注册用户
router.post('/api/signup', (req, res) => {
  let userName = req.body.userName
  let password = req.body.pwdword

  model.User.findOne()
    .where('userName').equals(userName)
    .exec((err, data) => {
      if (data !== null) {
        res.json({
          code: 500,
          data: {},
          msg: '该用户名已存在'
        })
      } else {
        let user = new model.User({
          userName: userName,
          password: password,
          regTime: new Date()
        })
        user.save((err, data) => {
          if (err) {
            return
          }
          res.json({
            code: 200,
            data: data._id,
            msg: '恭喜，注册成功'
          })
        })
      }
    })
})

//用户登录
router.post('/api/signin', (req, res) => {
  let userName = req.body.userName
  let password = req.body.pwdword

  model.User.findOne()
    .where('userName').equals(userName)
    .exec((err, data) => {
      if (err) {
        return
      }
      if (data === null) {
        res.json({
          code: 501,
          data: '',
          msg: '该用户不存在'
        })
        return
      }
      if (data.password === password) {
        let loginRemember = new model.LoginRemember({
          userId: data._id,
          rememberKey: new Date().getTime().toString() + parseInt(Math.random() * 1000000000).toString(),
          ipAddress: getLocalIp()
        })
        loginRemember.save((err, data) => {
          if (err) {
            return
          } else {
            res.json({
              code: 200,
              data: {
                userId: data.userId,
                rememberKey: data.rememberKey
              },
              msg: '登陆成功'
            })
          }
        })
      } else {
        res.json({
          code: 502,
          data: '',
          msg: '用户名或密码错误'
        })
      }
    })
})

//免登验证
router.post('/api/autoSignin', (req, res) => {
  let rememberKey = req.body.rememberKey

  model.LoginRemember.findOne()
    .where('rememberKey').equals(rememberKey)
    .exec((err, data) => {
      if (err) {
        return
      }
      if (data === null) {
        res.json({
          code: 400,
          data: '',
          msg: '请重新登录'
        })
        return
      }
      if (data.ipAddress === getLocalIp()) {
        res.json({
          code: 200,
          data: '',
          msg: '登陆成功'
        })
      } else {
        res.json({
          code: 400,
          data: '',
          msg: '登陆失败'
        })
      }
    })
})

//保存文章
router.post('/api/saveArticle', (req, res) => {
  let content = req.body.content
  let userId = req.body.userId
  let title = req.body.title

  let article = new model.Article({
    userId: userId,
    title: title,
    content: content,
    createTime: new Date()
  })

  article.save((err, data) => {
    if (err) {
      return
    }
    res.json({
      code: 200,
      data: '',
      msg: '保存成功'
    })
  })
})

//获取所有文章
router.post('/api/getAllArticle', (req, res) => {
  model.Article.find()
    .exec((err, data) => {
      if (err) {
        return
      }
      if (data === null) {
        data = []
      }
      res.json({
        code: 200,
        data: data,
        msg: '获取所有文章成功'
      })
    })

})

//获取指定文章
router.post('/api/getArticleById', (req, res) => {
  let _id = mongoose.Types.ObjectId(req.body._id)
  articleDao.getArticleById(_id)
    .then(article => {
      if (article === null) {
        res.json({
          code: 400,
          data: '',
          msg: '文章获取失败'
        })
        return
      }
      return Promise.resolve(article)
    })
    .then(article => {
      userDao.getUserById(article.userId)
        .then(user => {
          if (user === null) {
            res.json({
              code: 400,
              data: '',
              msg: '用户获取失败'
            })
          }
          let data = {
            user: user,
            article: article
          }
          return Promise.resolve(data)
        })
    })
    .then(data => {
      res.json({
        code: 200,
        data: data,
        msg: '获取成功'
      })
    })
    .catch(err => {
      res.json({
        code: 400,
        data: '',
        msg: '服务器错误'
      })
    })
//   model.Article.findOne()
//     .where('_id').equals(_id)
//     .exec((err, data) => {
//       if (err) {
//         return
//       }
//       if (data === null) {
//         res.json({
//           code: 400,
//           data: '',
//           msg: '获取失败'
//         })
//         return
//       }
//       res.json({
//         code: 200,
//         data: data,
//         msg: '文章获取成功'
//       })
//     })
})

module.exports = router
