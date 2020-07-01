const express = require("express");
const app = express();



//跨域
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));

//在路由之前封装res.cc 简化代码
app.use((req,res,next)=>{
    res.cc=(err,status=1)=>{
        res.send({
            status,
            msg:err instanceof Error?err.message:err
        })
    }
    next()
})

//验证token (路由之前) 放res.cc之后因为认证错误会进入错误中间件
const {jwtSecretKey,expiresIn}=require('./config/index')
const expressJwt=require('express-jwt')
app.use(expressJwt({secret:jwtSecretKey}).unless({path:[/^\/api\//]}))

//注册路由
const userRouter=require('./router/user')
app.use('/api',userRouter)
//用户信息路由
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)
//文章分类路由
const articleCatesRouter=require('./router/article_cates')
app.use('/my/article',articleCatesRouter)
//文章管理路由
const articleRouter=require('./router/article')
app.use('/my/article',articleRouter)



//错误处理中间件
//验证joi ,需要引入定义规则的joi包
const joi=require('@hapi/joi');
app.use((err,req,res,next)=>{
    //数据验证错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    if(err.name==='UnauthorizedError') return res.cc('身份认证失败,请重新登录') 
    //未知错误
    res.cc(err)
})

app.listen(3002, () => console.log("Run on port http://127.0.0.1:3002"));
