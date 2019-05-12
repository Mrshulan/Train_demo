import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import createApp from './createApp'

const { router, store } = createApp(window.__STORE__)
console.log(window.__STORE__)
// 在浏览器端渲染时 注水 也就是store
// 在development下 hyrate text node有警告(仅仅是语义而已)
// 在production下 hyrate text node无警告
ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>{ router }</BrowserRouter>
  </Provider>,
  document.getElementById('app')
)