import routerConfig from './router'
import createStore from './redux/store/createStore'
import { renderRoutes } from 'react-router-config'

// 提取公共使用代码
export default function(store = {}) {
  return {
    router: renderRoutes(routerConfig),
    store: createStore(store),
    routerConfig,
  }
}