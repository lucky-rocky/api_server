//定义用户信息的验证规则
const joi=require('@hapi/joi')

module.exports={
    //注册和登录都要验证body里面的username和password  (除此还可验证query params)
    reguser_login:{
        body:{
            username:joi.string().alphanum().min(3).max(12).required(),
            password:joi.string().required().pattern(/^[\S]{6,12}$/),
            nickname:joi.string().pattern(/^[\S]{4,12}$/),
            email:joi.string().pattern(/^[\S]{4,12}$/),
        }
    },
    update:{
        body:{
            id:joi.number().integer().min(1).required(),
            nickname:joi.string().pattern(/^[\S]{4,12}$/),
            email:joi.string().email().required()
        }
    },
    updatepwd:{
        body:{
            oldPwd:joi.string().required().pattern(/^[\S]{6,12}$/),//符合密码规则
            //新密码和旧密码不同,且满足密码规则
            newPwd:joi.not(joi.ref('oldPwd')).concat(joi.string().required().pattern(/^[\S]{6,12}$/))
        }
    },
    updateAvatar:{
        body:{
            //请求的参数名
            avatar:joi.string().dataUri().required()
        }
    }
}
