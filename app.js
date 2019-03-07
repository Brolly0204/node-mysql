const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      return resolve({})
    }

    if (req.headers['content-type'] !== 'application/json') {
      return resolve({})
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk
    })

    req.on('end', () => {
      if (!postData) {
        return resolve({})
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then(postData => {
    req.body = postData

    if (req.path.includes('/api/blog/')) {
      // 处理blog路由
      const blogResult = handleBlogRouter(req, res)
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    if (req.path.includes('/api/user/')) {
      // 处理user路由
      const userResult = handleUserRouter(req, res)

      userResult.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle

// process.env.NODE_ENV
