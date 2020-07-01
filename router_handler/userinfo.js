const connection = require("../db/index");
const bcryptjs = require("bcryptjs");
module.exports = {
  //根据id查询用户信息
  getUserInfo(req, res) {
    let sql =
      "select id,username,email,nickname,user_pic from ev_user where id=?";
    connection.query(sql, [req.user.id], (err, result, fields) => {
      if (err) return res.cc(err);
      if (result.length !== 1) return res.cc("用户信息查询失败");
      res.send({ status: 0, msg: "信息查询成功", data: result[0] });
    });
  },
  //更新用户信息
  updateUserInfo(req, res) {
    let sql = "update ev_user set ? where id=?";
    connection.query(sql, [req.body, req.body.id], (err, result, fields) => {
      if (err) return res.cc(err);
      // console.log(result);
      if (result.affectedRows !== 1) return res.cc("更新失败");
      res.cc("更新成功", 0);
    });
  },
  //重置密码 请求数据复合验证规则后
  updatePwd(req, res) {
    //根据id查询用户是否存在
    let sql = "select * from ev_user where id=?";
    connection.query(sql, [req.user.id], (err, result, fields) => {
      if (err) return res.cc(err);
      if (result.length !== 1) return res.cc("用户不存在");
      //查询成功 验证旧密码是否和数据库一致
      let compareResult = bcryptjs.compareSync(
        req.body.oldPwd,
        result[0].password
      );
      if (!compareResult) return res.cc("密码错误");
      //验证成功,替换数据库密码
      let password = bcryptjs.hashSync(req.body.newPwd, 10);
      sql = "update ev_user set ? where id=?";
      connection.query(sql, [{ password }, req.user.id], (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc("修改失败");
        res.cc("修改密码成功", 0);
      });
    });
  },
  //更换头像
  updateAvatar(req, res) {
    let sql = "update ev_user set ? where id=?";
    connection.query(sql, [{user_pic:req.body.avatar},req.user.id], (err, result, fields) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("头像修改失败");
      res.cc('头像修改成功',0)
    });
  },
};
