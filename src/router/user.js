const { SuccessModel, ErrorModel } = require('../model/resModel')
const { loginCheck } = require('../controller/user')

const handleUserRouter = (req, res) => {
  // 请求方法
  const method = req.method
  const url = req.url
  // 请求路径
  const path = url.split('?')[0]

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = loginCheck(username, password)
    return result.then(user => {
      if (user.username) {
        return new SuccessModel(user)
      }
      return new ErrorModel('登录失败')
    })
  }
}

module.exports = handleUserRouter
