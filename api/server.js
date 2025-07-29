const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'db.json') // ⬅️ Make sure path is correct
const raw = fs.readFileSync(filePath, 'utf-8')
const data = JSON.parse(raw)
const router = jsonServer.router(data)

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
