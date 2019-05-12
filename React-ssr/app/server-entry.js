import ReactDom from 'react-dom';
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-config'
import createApp from './createApp'

export default ctx => {
  return new Promise((resolve, reject) => {
    const { router, store, routerConfig } = createApp()
    // 根据自己routerConfig的匹配上的完整输出(pages里边页面上的顶层组件)
    const routes = matchRoutes(routerConfig, ctx.url)

    // 没有匹配上的路由则返回404
    if(routes.length <= 0) {
      return reject({ status: 404, message: 'Not Found Page'})
    }
    // 等所有数据请回求来之后在render, 注意这里不能用ctx上的路由信息，要使用前端的路由信息
    const promises = routes.filter(item => item.route.component.getInitialProps)
      .map(item => item.route.component.getInitialProps(store, item.match))

      
    Promise.all(promises).then((res) => {
      // [ [{ type: 'HOME/SUCCESS', result: [Object] }] ]
      // console.log(res)
      ctx.store = store // 挂载到ctx上，方便渲染到页面上
      // 最终的控制权resolve在这里
      resolve(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={ctx}>
            { router } 
          </StaticRouter>
        </Provider>
      )
    })
    .catch(err => {
      reject(res)
    })
    
  })
}