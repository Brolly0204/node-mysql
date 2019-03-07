const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lwl931224',
  port: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

// const sql = 'select username from users order by id;'
const sql =
  'insert into blogs (title, content, author) values ("我爱你", "我也爱你", "Brolly");'

con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
})

con.end()
