// 微信里边不能够直接继承原始类
Array.prototype.pushNameSpace = function (...arg) {
  arg = arg.map(item => {
    if(/object/i.test(typeof item)) {

      // 是否带了命名空间
      if(item.nameSpace){
        return {
          nameSpace: item.nameSpace,
          data: item.data
        }
      } else {
        return {
          nameSpace: 'default',
          data: item
        }
      }
    } else {
      return {
        nameSpace: 'default',
        data: item
      }
    }
  })
  // [{nameSpace:, data: }，....]
  this.push(...arg)
}

// 查询命名空间的参数
Array.prototype.findNameSpace = function (nameSpace = 'default', subscript) {
  // 把nameSpace过滤出来 拿到数据data
  const data = this.filter(item => {
    return new RegExp(nameSpace, 'i').test(item.nameSpace)
  }).map(item => item.data)

  if(/boolean/i.test(typeof subscript) && subscript) {
    return data
  } else {
    if(subscript === undefined) {
      //如果没有指定下标,默认取第后一个
      subscript = data.length - 1
    }
    return data[subscript]
  }
}

export default Array