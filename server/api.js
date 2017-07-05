const express = require('express')
const router = express.Router()
const db = require('./db')
const model = require('./model')
const mongoose = require('mongoose')

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
            data: {},
            msg: '注册成功'
          })
        })
      }
    })
})

module.exports = router
