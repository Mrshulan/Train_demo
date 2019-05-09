// reducers/list.js
const defaultState = {
  loaded: false,
  list: [
      'react',
      'koa',
      'react-ssr'
  ]
}

export default function(state  = defaultState , action) {
  switch (action.type) {
      default:
          return state
  }
}
