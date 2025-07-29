const jsonServer = require('json-server')
const server = jsonServer.create()

// Load initial data into memory
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'db.json')  // use __dirname
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
const router = jsonServer.router(data)  // In-memory only

const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running in memory-only mode')
})
