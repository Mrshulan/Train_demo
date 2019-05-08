import React from 'react'
import { render } from 'react-dom'
import './style/index.less'
import logo from './static/default.jpg'

function App() {
  return (
    <div>
      <div>Hot React</div>
      <img src={ logo } className='logo' />
    </div>
  )
}

render(<App/>, document.getElementById('app'))