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
router.post('/api/signup', async(req, res) => {
    let userName = req.body.userName
    let password = req.body.pwdword

    try {
        let user = await dao.userDao.getUserByUserName(userName)
        if (user !== null) {
            res.json({ code: 500, data: {}, msg: '该用户名已存在' })
        } else {
            let newUser = await dao
                .userDao
                .addUser(userName, password)
            res.json({ code: 200, data: newUser._id, msg: '恭喜，注册成功' })
        }
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }

})

//用户登录
router.post('/api/signin', async(req, res) => {
    let userName = req.body.userName
    let password = req.body.pwdword

    try {
        //根据userName查找用户是否存在
        let user = await dao.userDao.getUserByUserName(userName)
        if (user === null) {
            res.json({ code: 501, data: '', msg: '该用户不存在' })
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
            res.json({ code: 502, data: '', msg: '用户名或密码错误' })
        }
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }
})

//免登验证
router.post('/api/autoSignin', async(req, res) => {
    let rememberKey = req.body.rememberKey
    try {

        let remember = await dao.loginRememberDao.findRememberByKey(rememberKey)

        //存在性验证
        if (remember === null) {
            res.json({ code: 400, data: '', msg: '请重新登录' })
            return
        }

        //免登超时验证
        let nowTime = new Date().getTime(),
            createTime = remember.createTime,
            autoSignAllowTime = 10 * 24 * 3600 * 1000
        if ((nowTime - createTime) > autoSignAllowTime) {
            res.json({ code: 400, data: '', msg: '免登时间已过，请重新登录' })
            return
        }

        //ip地址一致性验证
        if (remember.ipAddress === getLocalIp()) {
            let user = await dao.userDao.getUserById(remember.userId)
            if (user) {
                res.json({ code: 200, data: user, msg: '登陆成功' })
            }
        } else {
            res.json({ code: 400, data: '', msg: '请重新登录' })
        }
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }

})

//用户注销
router.post('/api/signout', async(req, res) => {
    let userId = req.body.userId
    await dao.loginRememberDao.delRememberByUserId(userId)
    res.json({ code: 200, data: '', msg: '注销成功' })
})

//新建文章
router.post('/api/addArticle', async(req, res) => {
    let content = req.body.content || ''
    let userId = req.body.userId || ''
    let title = req.body.title || ''

    let newData = {
        content: content,
        userId: userId,
        title: title
    }

    try {
        let newArticle = await dao.articleDao.addArticle(newData)
        res.json({ code: 200, data: newArticle, msg: '新建文章成功' })
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }
})

//保存文章
router.post('/api/saveArticle', async(req, res) => {
    let _id = mongoose.Types.ObjectId(req.body._id),
        content = req.body.content,
        title = req.body.title,
        newData = {
            _id: _id,
            content: content,
            title: title
        }
    try {
        let newAritcle = await dao.articleDao.saveArticle(newData)
        res.json({ code: 200, data: '', msg: '文章保存成功' })
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }
})

//获取所有文章
router.post('/api/getAllArticle', async(req, res) => {
    try {
        let allArticle = await dao.articleDao.getAllArticle()
        res.json({ code: 200, data: allArticle, msg: '获取所有文章成功' })
    } catch (err) {
        res.json({ code: 400, data: '', msg: '服务器错误' })
    }
})

//获取指定文章
router.post('/api/getArticleById', async(req, res) => {
    let _id = mongoose.Types.ObjectId(req.body._id)
    try {
        //获取文章数据
        let article = await dao.articleDao.getArticleById(_id)

        if (article === null) {
            res.json({ code: 400, data: '', msg: '文章获取失败' })
            return
        }

        //获取用户数据
        let user = await dao.userDao.getUserById(article.userId)

        if (user === null) {
            res.json({ code: 400, data: '', msg: '用户获取失败' })
            return
        }

        //返回客户端数据
        res.json({ code: 200, data: { user: user, article: article }, msg: '获取成功' })
    } catch (err) {
        res.json({ code: 500, data: '', msg: '服务器错误' })
    }
})

//发布文章
router.post('/api/publishArticle', async(req, res) => {
    let _id = req.body._id
    try {
        await dao.articleDao.publishArticle(_id)
        res.json({ code: 200, data: '', msg: '发布成功' })
    } catch (err) {
        res.json({ code: 500, data: '', msg: '服务器错误' })
    }
})

//取消发布
router.post('/api/unpublishArticle', async(req, res) => {
    let _id = req.body._id
    try {
        await dao.articleDao.unpublishArticle(_id)
        res.json({ code: 200, data: '', msg: '已取消发布' })
    } catch (err) {
        res.json({ code: 500, data: '', msg: '服务器错误' })
    }
})

//删除文章
router.post('/api/deleteArticle', async(req, res) => {
    let _id = req.body._id
    try {
        await dao.articleDao.deleteArticle(_id)
        res.json({ code: 200, data: '', msg: '删除成功' })
    } catch (err) {
        res.json({ code: 500, data: '', msg: '服务器错误' })
    }
})
module.exports = router