import PageModule from '../lib/Page.js'

const $page = new PageModule({
  data: {
    txt: 'just test'
  },

  test() {
    console.log('我是一个公众的测试事件')
  }
})

export default $page