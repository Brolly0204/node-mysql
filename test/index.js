const fs = require('fs')
const path = require('path')

const resolvePath = filename => path.join(__dirname, 'files', filename)

// function getFileContent(filename, callback) {
//   fs.readFile(resolve(filename), 'utf8', (err, data) => {
//     if (err) {
//       return console.error(err)
//     }
//     let resData = JSON.parse(data)
//     callback(resData)
//   })
// }

// getFileContent('a.json', data => {
//   console.log(data.msg)
//   getFileContent(data.next, data => {
//     console.log(data.msg)
//     getFileContent(data.next, data => {
//       console.log(data.msg)
//     })
//   })
// })

function getContentFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath(filename), 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

getContentFile('a.json')
  .then(data => {
    return getContentFile(data.next)
  })
  .then(data => {
    return getContentFile(data.next)
  })
  .then(data => {
    console.log(data.msg)
  })
