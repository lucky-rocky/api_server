const connection = require("../db/index");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwtSecretKey,expiresIn}=require('../config/index')
module.exports = {
  //注册 处理函数
  reguser(req, res) {
    let { username, password } = req.body;
    // if (!(username && password)) return res.cc("用户名或密码不能为空");
    //查询数据库是否已存在
    let sql = "select * from ev_user where username=?";
    connection.query(sql, [username], (err, result, fields) => {
      if (err) return res.cc(err);
      if (result.length > 0) return res.cc("用户名已存在");
      //查询成功 执行注册
      //调用 bcryptjs进行密码加密
      password = bcryptjs.hashSync(password, 10); //常量变量不可赋值Assignment to constant variable
      req.body.password = password;
      sql = "insert into ev_user set ?";
      connection.query(sql, req.body, (err, result, fields) => {
        //sql语句是否执行成功
        if (err) res.cc(err);
        //受影响行数是否为1
        if (result.affectedRows !== 1) return res.cc("注册失败");
        //注册成功
        // res.json({status:0,msg:'注册成功'})
        res.cc("注册成功", 0);
      });
    });
  },
  login(req, res) {
    let { username, password } = req.body;
    //路由中由局部中间件检验合法性
    //先在数据库中验证username
    let sql = "select * from ev_user where username=?";
    connection.query(sql, [username], (err, result, fields) => {
      //result是一个数组
      // console.log(result);
      if (err) return res.cc(err);
      if (result.length !== 1) return res.cc("登录失败");
      //再验证密码
      // 拿着用户输入的密码,和数据库中存储的密码进行对比,compareResult即比较结果,是个Boolean值
      //以sync结尾的api方法是同步方法
      let compareResult = bcryptjs.compareSync(password, result[0].password);
      if (!compareResult) return res.cc("登录失败");
      //TODO:登录验证成功 生成token密令并返回
      //将可以显示的信息生成密令 即去除password和user_pic的值,这样通过req.user就拿不到密码等重要信息
      const user = Object.assign({}, result[0], { password: "", user_pic: "" });
      // console.log(user);
      const token = jwt.sign(user, jwtSecretKey, { expiresIn});
      res.send({ status: 0, msg: "登录成功", token:`Bearer ${token}` });
    });
  },
};
