import { createStore, applyMiddleware } from 'redux'
// 用于在服务端的钩子  因为没有mock windows
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const initialState = { count: 0 }

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case 'ABOUT/ADD_COUNT':
      return { count: ++state.count }
    default: 
      return state
  }
}

export const actions = {
  addCount: () => {
    return {
      type: 'ABOUT/ADD_COUNT'
    }
  } 
}
// 区别对待production 和 devlopment
export function makeStore(initialState, { isServer }) {
  initialState || reducer()

  if(isServer) {
    // 服务端渲染肯定会先于持久化状态加载
    return createStore(reducer, initialState, applyMiddleware(thunk))
  } else {
    // redux-persist 来持久化存放在 Store 里的应用状态
    // 在服务端渲染时也可以初始化 Redux store 的状态，
    // 不过这里需要防止后续客户端加载的持久化状态覆盖掉服务端初始状态。(造成闪烁问题)
    const { persistReducer, persistStore } = require('redux-persist')
    const storage = require('redux-persist/lib/storage').default

    const persistedReducer = persistReducer({
      key: 'nextjs',
      storage
    }, reducer)

    const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
    store.__persistor = persistStore(store)

    return store
  }
}