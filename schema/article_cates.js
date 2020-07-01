//文章分类 定义参数验证规则
const joi=require('@hapi/joi')
const name=joi.string().required()
const alias=joi.string().alphanum().required()


module.exports={
    addCates:{
        body:{
            name,
            alias
        }
    },
    del_Id:{
        params:{
            id:joi.number().integer().min(1).required()
        }
    }
}