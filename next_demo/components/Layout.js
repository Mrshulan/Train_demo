import Header from './Header'
import { Button } from 'antd'

const layoutStyle = {
  mergin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <Button type="primary">Button</Button>
  </div>
)

export default Layout