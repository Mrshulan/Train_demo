import Koa from 'koa'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
import routes from './router'

import templating from './templating'

const app = new Koa()

// const App = () => <div>HOT React SSR by koa</div>
// app.use(ctx => {
//   // ctx.body = '<div>Hello Koa2</div>'
//   ctx.body = renderToString(<App />)
// })


app.use(templating)
app.use(routes.routes()).use(routes.allowedMethods())

app.listen(9000, () => {
  console.log('react-ssr端口开放在9000')
})


// 路由配置了两次，并且还要手动保持 react-router 和 koa-router 路径一致。
// 同样的请求，需要编写两次。
// 即使客户端资源完成打包，服务端依旧依赖了客户端的源代码。
// 没办法写css module。
// 开发环境不友好，需要启动两个服务，并且热更新支持很差。
