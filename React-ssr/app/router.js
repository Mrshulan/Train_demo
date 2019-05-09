import { Link, Switch, Route } from 'react-router-dom'
import React from 'react'

import Home from './pages/home'
import List from './pages/list'

// const Home = () => (
//   <div>
//     <h1>首页</h1>
//     <Link to='/list'>跳转列表页</Link>
//   </div>
// )

// const list = [
//   'react',
//   'koa',
//   'react-ssr'
// ]

// const List = () => (
//   <ul>
//     { list.map((item, i) => <li key={ item }>{ item }</li>)}
//   </ul>
// )

// 前端跳转到列表页，然后刷新页面就会提示404
export default () => (
  <Switch>
    <Route exact path='/' component={ Home }/>
    <Route exact path='/list' component={ List }/>
  </Switch>
)