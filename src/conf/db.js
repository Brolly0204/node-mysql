const env = process.env.NODE_ENV // 环境变量

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lwl931224',
    prot: 3306,
    database: 'myblog'
  }
}

if (env === 'prod') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'lwl931224',
    prot: 3306,
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}
