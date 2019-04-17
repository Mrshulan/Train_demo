// pages/home/list.js

import utlis from "../../utils/utils.js";

const appid = 92487,
  appsign = '4b7ca2a09b6c4b599dc24951bf7f22fe',
  appurl = "https://route.showapi.com/909-1"; //showapi火车票请求头

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
    this.requestData(options).then(this.codeData.bind(this))
  },
  requestData(o){
    // console.log(o) index的data
    return new Promise((resolve) => {
      // console.log(this) Page()返回的实例
      wx.request({
        url: appurl,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: Object.assign({
          "showapi_timestamp": utlis.formatterDateTime(),
          "showapi_appid": appid, //appid
          "showapi_sign": appsign,  //密钥secret
        }, o),
        success: resolve
      })
    })
  },
  // 打包数据
  codeData(res) {
    const resBody = res.data.showapi_res_body; // 查询的数据都在showapi_res_body
    const trains = [];

    console.log(res);

    //遍历火车票信息
    resBody.trains.forEach(item => {

      const ticketInfo = Object.values(item.ticketInfo) // 座位信息
      const price = Math.min.apply(null, ticketInfo.map(item => item.price)) // 拿到最低起价

      // 根据wxml设置 setData
      if (ticketInfo.length) {
        trains.push({
          ticketInfo, // 票的原始数据
          price, // 起价
          fromCity: item.fromCity, // 起始城市
          fromTime: item.fromTime, // 起始时间
          num: item.num, // 列车号
          toTime: item.toTime, // 抵达时间
          toCity: item.toCity, // 到达时间
          usedTime: utlis.minuteToString(item.usedTime) // 花费时间
        });
      }
    });

    this.setData({ trains })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})