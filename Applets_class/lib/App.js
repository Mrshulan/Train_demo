import Event from './Event.js'

let app

export default class AppModule extends Event {
  // 全局数据
  globalData = {}
  // 页面数据
  pageData = {}

  constructor() {
    super()
  }

  //给当前页面设置数据的, 不用在实际显示的页面设置数据, 通过assign代理直接给当前页设置
  assign(key, val) {
    // 在Page constructor里边定义过拿到当前显示的页面实例page:{example: PageModule, page: q, route: 'pages/home/index'}
    let page = app.page.page

    // 讨论传入参数情况
    let kType = typeof key
    if(/string/i.test(kType) && val !== undefined) {
      // 这里使用page 就相当的舒服了
      page.setData({
        [key]: val
      })
    } else if (/object/i.test(kType)) {
      page.setData(key)
    }
  }

  // 用于 获取/修改 全局数据 一参get 二参set
  data(...arg) {
    if(arg.length === 0) {
      return this.globalData
    } else if(arg.length === 1) {
      // 如果参数只有一个 获取其类型
      const kType = typeof arg[0]
      // 如果类型是一个字符串即为获取某一项
      if(/string/i.test(kType)) {
        return this.globalData[arg[0]]
      }
      // 如果是对象
      if(/object/i.test(kType)) {
        const data = arg[0]

        for(let key in data) {
          // 此时就是length === 2 进行设置全局对象了
          this.data(key, datap[key])
        }
      }
    } else if (arg.length === 2) {
      this.globalData[arg[0]] = arg[1]
    }
  }

  // 初始化方法
  start() {
    // AppModule实例保存
    const appExample = this
    // 监听app的加载时间 
    // 实例里边会有一个onLaunch 返回队列结果
    this.oneEvent('onLaunch', function () {
      // 此this(所处页面的page实例)和彼this(AppModule实例对象)
      Reflect.set(this, 'example', appExample)
      // 此时app 就拿到了所处页面的实例
      app = this
    })

    // App方法调用的时候接受一个对象, 会通过浅拷贝的方式将数据添加到app方法里  App({})
    App(this)
  }
}