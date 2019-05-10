import React from 'react'
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'

import { makeStore } from '../store'

class MyApp extends App {
  static async getInitialProps({ Component,router, ctx }) {
    const { store } = ctx

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { store, pageProps, router}
  }

  render() {
    const { store, Component, pageProps, router} = this.props

    return (
      <Provider store={store}>
        <Component {...pageProps} {...router}/>
      </Provider>
    )
  }
}

export default withRedux(makeStore)(MyApp)



// import App, {Container} from 'next/app'
// import React from 'react'
// export default class MyApp extends App {
//   static async getInitialProps ({ Component, router, ctx }) {
//     let pageProps = {}

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//     }

//     return {pageProps, router}
//   }

//   render () {
//     const {Component, pageProps, router} = this.props
//     return <Container>
//       <Component {...pageProps} {...router}/>
//     </Container>
//   }
// }