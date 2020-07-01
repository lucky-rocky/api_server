const express = require("express");
const router=express.Router()
const handler=require('../router_handler/user')
const {reguser_login}=require('../schema/user')
const expressJoi=require('@escook/express-joi')
//注册为中间件,自动验证参数是否满足验证规则,传入验证规则,不满足时会抛出错误,可用错误中间件接收
//传递的参数都需要进行验证(都要有判断规则),不然会报错
//可以存在规则,但是没传该参数,比如,登录时,只传递了username和password



router.post('/reguser', expressJoi(reguser_login),handler.reguser) //属性里面储存的就是函数,注意
router.post('/login',expressJoi(reguser_login),handler.login)

module.exports=router