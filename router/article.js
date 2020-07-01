const express = require("express");
const router=express.Router()

//处理函数
const handler=require('../router_handler/article')

//表单验证
const expressJoi=require('@escook/express-joi')
const {addArticle}=require('../schema/article')

//fromdata表单处理中间件 multer 设置为局部中间件,会将文件信息挂载到req.file,其他键值对参数挂载到req.body
const multer=require('multer')
const path=require('path')
//指定文件上传位置
const uploads=multer({dest:path.join(__dirname,'../uploads')})
//指定上传文件名
router.post('/add',[uploads.single('cover_img'),expressJoi(addArticle)],handler.addArticle)

module.exports=router