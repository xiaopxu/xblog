const express = require('express')
const router = express.Router()
const db = require('./db')
const model = require('./model')
const mongoose = require('mongoose')
const md5 = require('md5')

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
                res.json({
                    code: 200,
                    data: data._id,
                    msg: '登陆成功'
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

module.exports = router
