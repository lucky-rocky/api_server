const joi = require("@hapi/joi")

const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')//允许为空
const state = joi.string().valid('已发布', '草稿').required()//有效值为 '已发布'或者'草稿'

module.exports={
    addArticle:{
        body:{
            title,
            cate_id,
            content,
            state
        }
    }
}
