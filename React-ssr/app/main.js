import React from 'react'
import { render } from 'react-dom'
// import './style/index.less'
// import logo from './static/default.jpg'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import createStore from './redux/store/create'

const defaultStore = window.__STORE__ || {}

const store = createStore(defaultStore)

// function App() {
//   return (
//     <div>
//       <div>Hot React</div>
//       <img src={ logo } className='logo' />
//     </div>
//   )
// }

// render(<App/>, document.getElementById('app'))

render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)