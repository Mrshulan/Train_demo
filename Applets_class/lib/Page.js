import Event from './Event.js'

// 获取全局app对象
const app = getApp()

export default class PageModule extends Event{
  // 数据筛选方法
  static select(obj) {
    const events = {}
    const data = {}

    Object.keys(obj).forEach(key => {
      if(/function/i.test(typeof obj[key])) {
        events[key] = obj[key]
      } else {
        data[key] = obj[key]
      }
    })


    return { events, data }
  }

  constructor(data) {
    super()
    // 保存当前pageModule
    const pageExample = this
    // 监听app的 加载事件
    this.oneEvent('onLoad', function () {
      Reflect.set(app, 'page', {
        example: pageExample,
        page: this,
        route: this.route
      })
    })
    // 判断是否传入data
    data && this.extend(data)
  }

  exports(...arg) {
    arg = arg.length ? arg : Object.keys(tihs.events)

    const event = {}
    arg.forEach(eType => {
      if(/function/i.test(typeof this[eType])) {
        events[eType] = this[eType]
      } else {
        throw new Error(`不存在 ${eType} 事件`)
      }
    })

    return events
  }

  extend(obj) {
    // 筛选事件和属性
    const { events, data } = PageModule.select(obj)
    // 添加事件
    for(let eType in events) {
      this.addEvent(eType, obj[eType])
    }
    // 添加属性
    Object.assign(this, data)
  }

  // 初始化
  start(data) {

    data && this.extend(data)

    Page(this)
  }
}