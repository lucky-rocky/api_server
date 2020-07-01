const mysql = require('mysql');	
const connection = mysql.createPool({	
 host: 'localhost',	
 user: 'root',	
 password: 'root',	
 database: 'diy',	
});	
// 向外共享 db 数据库连接对象
module.exports=connection
