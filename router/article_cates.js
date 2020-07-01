const express = require("express");
const router=express.Router()

const expressJoi=require('@escook/express-joi')
const {addCates,del_Id}=require('../schema/article_cates')

//处理函数
const handler=require('../router_handler/article_cates')

//获取文章分类列表
router.get('/cates',handler.getArticleCates)
//新增文章分类
router.post('/addcates',expressJoi(addCates),handler.addArticleCates)
//根据 Id 删除文章分类
router.get('/deletecate/:id',expressJoi(del_Id),handler.delArticleCates)

module.exports=router