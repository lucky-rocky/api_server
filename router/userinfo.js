const express = require("express");
const router=express.Router()
const handler=require('../router_handler/userinfo')
const {update,updatepwd,updateAvatar}=require('../schema/user')
const expressJoi=require('@escook/express-joi')
//获取信息
router.get('/userinfo',handler.getUserInfo)

//更新用户信息
router.post('/userinfo',expressJoi(update),handler.updateUserInfo)

//重置密码
router.post('/updatepwd',expressJoi(updatepwd),handler.updatePwd)

//更换头像
router.post('/update/avatar',expressJoi(updateAvatar),handler.updateAvatar)



module.exports=router