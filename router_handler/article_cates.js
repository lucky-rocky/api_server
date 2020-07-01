const connection = require("../db/index");
module.exports = {
  getArticleCates(req, res) {
    let sql = "select * from ev_user_article where is_delete=0 order by Id asc";
    connection.query(sql, (err, result, fields) => {
      if (err) return res.cc(err);
      res.send({ status: 0, msg: "查询成功", data: result });
    });
  },
  addArticleCates(req, res) {
    //满足验证规则后查询用户名或者别名是否不重复
    let sql = "select * from ev_user_article where name=? or alias=?";
    connection.query(
      sql,
      [req.body.name, req.body.alias],
      (err, result, fields) => {
        if (err) return res.cc(err);
        if (result.length === 2) return res.cc("用户名和别名被占用");
        if (result.length === 1) {
          if (
            req.body.name === result[0].name &&
            req.body.alias === result[0].alias
          )
            return res.cc("用户名和别名被占用");
          if (req.body.name === result[0].name) return res.cc("用户名被占用");
          if (req.body.alias === result[0].alias) return res.cc("别名被占用");
        }
        //不重复 进行添加操作
        sql = "insert into ev_user_article set ?";
        connection.query(sql, req.body, (err, result, fields) => {
          if (err) return res.cc(err);
          if (result.affectedRows !== 1) return res.cc("新增文章分类失败");
          res.cc("新增成功", 0);
        });
      }
    );
  },
  delArticleCates(req, res) {
    let sql = "update ev_user_article set ? where id=?";
    connection.query(
      sql,
      [{ is_delete: 1 }, req.params.id],
      (err, result, fields) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc("删除文章分类失败");
        res.cc("删除成功", 0);
      }
    );
  },
};
