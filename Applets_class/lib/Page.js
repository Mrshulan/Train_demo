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
    // 监听全局app的 加载事件 这里onload 长度为 1
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

  // 导出事件队列
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

  // 合并
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

    // data 还需要extend的话
    data && this.extend(data)

    // 因为是置入Page里边， 其实这里边就是一个作用域起到了作用 
    Page(this)
  }
}