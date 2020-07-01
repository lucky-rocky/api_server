const path = require("path");
const connection = require("../db/index");
module.exports = {
  addArticle(req, res) {
    // console.log(req.file);//不上传,为undefined
    //手动验证图片文件是否传递
    if (!req.file || req.file.fieldname !== "cover_img")
      return res.cc("图片为必传参数");
    //参数全都合法,准备插入数据
    //准备数据对象
    let articleInfo = {
      ...req.body,
      cover_img: path.join("/uploads", req.file.filename),
      pub_date: new Date(),
      author_id: req.user.id,
    };
    let sql = "insert into ev_articles set ?";
    connection.query(sql, articleInfo, (err, result, fields) => {
      if (err) return res.cc(err);
      if (result.affectedRows!==1) return res.cc('新增文章失败')
      res.cc('新增成功',0)
    });
  },
};
