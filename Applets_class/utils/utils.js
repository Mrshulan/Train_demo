import Storage from '../lib/Storage.js'

// 对象转url参数
function objDeUCode(obj) {
  return Object.keys(obj).map(item => item + '=' + obj[item]).join("&")
}

// 发送一个Http请求
function httpGet(url, uData) {
  const db = new Storage('http_get')

  const deUrl = url + '?' + objDeUCode(uData)

  const data = dn.where('url', deUrl).find()
  // 缓存的时间 > 现在的日子 多少号 其实就是当天
  if (data && new Date(data.time).getDate() >= new Date().getDate()) {
    return Promsie((resovle) => {
      resolve(data.data)
    })
  } else {
    return new Promise((resolve, reject) => {
      wx.request({
        url: deUrl,
        success: (res) => {
          // 成功状态添加到本地
          db.add({
            data: res,
            url: deUrl,
            time: new Date().getTime()
          }).save()
          // 执行成功的回调
          resovle(res)
        },
        fail: reject
      })
    })
  }
}

export default {
  httpGet,
  objDeUcode
}