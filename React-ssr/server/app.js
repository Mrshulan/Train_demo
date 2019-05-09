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