const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 1=1用来占位
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  return exec(sql)
}

const getDetail = id => {
  let sql = 'select * from blogs'
  if (id && !isNaN(id)) {
    sql = `select * from blogs where id=${id}`
  }
  return exec(sql).then(rows => rows[0])
}

const newBlog = (blogData = {}) => {
  // 包含 title content author createtime
  const { title, content, author } = blogData

  const sql = `insert into blogs (title, content, author) values ('${title}', '${content}', '${author}')`

  return exec(sql).then(insertData => {
    console.log(`insertData is `, insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exec(sql).then(data => {
    console.log('update', data)
    return data.affectedRows > 0
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(data => data.affectedRows > 0)
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
