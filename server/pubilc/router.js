const router = require('express').Router()
const mongoose = require('mongoose')
// Schema
const User = require('../models/user')
const Tool = require('../utils/tools')

// 登录
router.post('/login',function(req,res){
    User.find(req.body)
    .then((data)=>{
        if(data.length) {
            res.send({code: 200,data: data[0], message: 'ok'})
        } else {
            res.send({ code: 500, data : err, message: '数据异常'})
        }
    })
    .catch((err)=>{
        res.send({ code: 500, data : err, message: '用户名或密码错误'})
    })
   
})

// 注册
router.post('/register',function(req,res){
    let params = req.body
    if(!params.agree) {
        res.send({ code: 400, data: '', message: '请阅读并同意 用户协议 以及 隐私政策' })
    } else {
        if(!(params.phone && params.password)) { 
            res.send({ code: 400, data : '', message: '数据异常' })
            return
        } else {
            // 查找是否有这个用户
            User.find({phone: params.phone}).then((data)=>{
                if(data.length) { 
                    res.send({ code: 4, data : data, message: '已存在该用户'})
                } else {
                    new User(params).save()
                    .then(( data)=> res.send({ code: 200, data: data, message: '用户注册成功' }))
                    .catch((err)=> res.send({ code: 500, data: err, message: '用户注册失败' }))
                }
            }) 
        }
    }
})

module.exports = router