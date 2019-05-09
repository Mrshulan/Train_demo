import Router from 'koa-router'
import RouterConfig from '../../app/router'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import React from 'react'

const routes = new Router()

routes.get('/', (ctx, next) => {
  // ctx.body = renderToString(
  //   <StaticRouter location={ctx.url}>
  //     <RouterConfig/>
  //   </StaticRouter>
  // )
  ctx.render()
  next()
})

routes.get('/list', (ctx, next) => {
  // ctx.body = renderToString(
  //   <StaticRouter location={ctx.url}>
  //     <RouterConfig />
  //   </StaticRouter>
  // )
  ctx.render()
  next()
})

export default routes

