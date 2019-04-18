// 对数组类进行扩展
import myArray from './ArrayEx.js'

export default class Event {
  // 构造方法
  constructor() {
    // 保存事件监听方法的类型和方法
    Object.defineProperty(this, 'events', {
      value: {},
      enumerable: false
    })
  }

  // 内部来的静态方法->事件队列的触发器 getEvent里边触发队列生成
  static createEventHandle(eType, that) {

    // 生成触发器的包装函数 enumerable 所以可以使用Reflect来设置获取
    // that就是实例 实例上的每个 eType 是个函数 返回该 events里边的eType的事件队列的最终结果
    Reflect.set(that, eType, function(...arg) {
      // 将page的this实例保存起来
      const page = this
      const data = []

      // 拷贝一份事件队列
      const eTypeFn = Array.from(Reflect.get(that.events, eType))

      // 递归实现动画队列
      (function recur() {
        // 出队列
        const f = eTypeFn.shift()
        // f.apply(page, arg) arg eTypeFn 对象函数执行结果通过pushNameSpace到data数组里边
        // -> [{nameSpace:, data: }，....]
        f && data.pushNameSpace(f.apply(page, arg))

        eTypeFn.length && recur()
      })()

      return data
    }) 
  }


  // 添加一个事件监听
  addEvent(eType, callback) {
    const eTypeFn = this.getEvent(eType)

    eTypeFn.push(callback)
  }
  // 获取事件队列
  getEvent(eType) {
    let eTypeFn = Reflect.get(this.events, eType)

    if(!Array.isArray(eTypeFn)) {
      eTypeFn = []
      Reflect.set(this.events, eType, eTypeFn)
      // 相当于 this.events[eType] = eTypeFn;
      // 添加一个触发器
      Event.createEventHandle(eType, this)
    }

    return eTypeFn
  }
  // 删除一个事件监听 
  removeEvent(eType, callback) {
    // 指定删除
    if(callback) {
      const eTypeFn = this.getEvent(eType)
      const index = eTypeFn.findIndex(item => item === callback)

      index != -1 && eTypeFn.splice(index, 1)
    } else {
      // 否则就直接置空eType队列
      Reflect.set(this.events, eType, [])
    }
  }
  // 一次性事件
  oneEvent(eType, callback) {
    const that = this 
    const handle = function (...arg) {
      callback.apply(this, arg)
      that.removeEvent(eType, handle)
    }

    this.addEvent(eType, handle)
  }
}

