const next = require('next')
const Koa = require('koa')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/', async (ctx) => {
      await app.render(ctx.req, ctx.res, '/', ctx.query)
      // 目的要绕过 koa 内置处理，让 next.js 来接手
      ctx.respond = false
    })

    // 服务器中对 /p/* 开头的路由进行重写，然后重定向到 /post 开头的路由上
    router.get('/p/:id', async (ctx) => {
      const actualPage = '/post'
      const queryParams = { 
          title: ctx.params.id 
      } 
      await app.render(ctx.req, ctx.res, actualPage, queryParams)
      ctx.respond = false
    })

    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(router.routes())

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })