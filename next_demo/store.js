import { createStore } from 'redux'

const initialState = { foo: '' }

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case 'FOO':
      return { ...stat, foo: action.payload }
    default: 
      return state
  }
}

export function makeStore(initialState, { isServer }) {
  initialState || reducer()

  if(isServer) {
    // 服务端渲染肯定会先于持久化状态加载
    return createStore(reducer, initialState)
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

    const store = createStore(persistedReducer, initialState)
    store.__persistor = persistStore(store)

    return store
  }
}