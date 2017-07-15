const express = require('express')
const router = express.Router()
const db = require('./db')
const model = require('./model/model')
const mongoose = require('mongoose')
const md5 = require('md5')
const getLocalIp = require('./utils/local_ip')
const getRememberKey = require('./utils/remember_key')
const dao = require('./dao/dao')

//注册用户
router.post('/api/signup', async (req, res) => {
  let userName = req.body.userName
  let password = req.body.pwdword

  let user = await dao.userDao.getUserByUserName(userName)
  if (user !== null) {
    res.json({
      code: 500,
      data: {},
      msg: '该用户名已存在'
    })
  } else {
    let newUser = await dao.userDao.addUser(userName, password)
    res.json({
      code: 200,
      data: newUser._id,
      msg: '恭喜，注册成功'
    })
  }
})

//用户登录
router.post('/api/signin', async (req, res) => {
  let userName = req.body.userName
  let password = req.body.pwdword

  try {
    //根据userName查找用户是否存在
    let user = await dao.userDao.getUserByUserName(userName)
    if (user === null) {
      res.json({
        code: 501,
        data: '',
        msg: '该用户不存在'
      })
      return
    }
    //确认密码是否正确
    if (user.password === password) {
      let oldRemember = await dao.loginRememberDao.findRememberByUserId(user._id)
      if (oldRemember !== null) {
        await dao.loginRememberDao.delRememberByUserId(user._id)
      }
      //插入新的rememberKey
      let newData = {
        userId: user._id,
        rememberKey: getRememberKey(),
        ipAddress: getLocalIp()
      }
      let newRemember = await dao.loginRememberDao.addRemember(newData)
      //登陆成功
      res.json({
        code: 200,
        data: {
          userId: newRemember.userId,
          rememberKey: newRemember.rememberKey
        },
        msg: '登陆成功'
      })
    } else {
      res.json({
        code: 502,
        data: '',
        msg: '用户名或密码错误'
      })
    }
  } catch (err) {
    res.json({
      code: 400,
      data: '',
      msg: '服务器错误'
    })
  }
})

//免登验证
router.post('/api/autoSignin', async (req, res) => {
  let rememberKey = req.body.rememberKey
  try {
    let remember = await dao.loginRememberDao.findRememberByKey(rememberKey)
    if (remember === null) {
      res.json({
        code: 400,
        data: '',
        msg: '请重新登录'
      })
      return
    } else {
      if (remember.ipAddress === getLocalIp()) {
        res.json({
          code: 200,
          data: '',
          msg: '登陆成功'
        })
      } else {
        res.json({
          code: 400,
          data: '',
          msg: '请重新登录'
        })
      }
    }
  } catch (err) {
    res.json({
      code: 400,
      data: '',
      msg: '服务器错误'
    })
  }

})

//保存文章
router.post('/api/saveArticle', async (req, res) => {
  let content = req.body.content
  let userId = req.body.userId
  let title = req.body.title

  let newData = {
    content: content,
    userId: userId,
    title: title
  }

  try {
    let newArticle = await dao.articleDao.addArticle(newData)
    res.json({
      code: 200,
      data: '',
      msg: '保存成功'
    })
  } catch (err) {
    res.json({
      code: 400,
      data: '',
      msg: '服务器错误'
    })
  }
})

//获取所有文章
router.post('/api/getAllArticle', async (req, res) => {
  try {
    let allArticle = await dao.articleDao.getAllArticle()
    res.json({
      code: 200,
      data: allArticle,
      msg: '获取所有文章成功'
    })
  } catch (err) {
    res.json({
      code: 400,
      data: '',
      msg: '服务器错误'
    })
  }
})

//获取指定文章
router.post('/api/getArticleById', async (req, res) => {
  let _id = mongoose.Types.ObjectId(req.body._id)
  try {
    //获取文章数据
    let article = await dao.articleDao.getArticleById(_id)

    if (article === null) {
      res.json({
        code: 400,
        data: '',
        msg: '文章获取失败'
      })
      return
    }

    //获取用户数据
    let user = await dao.userDao.getUserById(article.userId)

    if (user === null) {
      res.json({
        code: 400,
        data: '',
        msg: '用户获取失败'
      })
      return
    }

    //返回客户端数据
    res.json({
      code: 200,
      data: {
        user: user,
        article: article
      },
      msg: '获取成功'
    })
  } catch (err) {
    res.json({
      code: 500,
      data: '',
      msg: '服务器错误'
    })
  }
})

module.exports = router
