// pages/home/index.js
import utlis from "../../utils/utils.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    trainDate: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate()
  },
  //初始化当前时间
  initDate() {
    // 利用204返回头
    wx.request({
      url: 'https://www.showapi.com',
      method: "HEAD",
      success: (res) => {
        //服务器时间(标准北京时间)
        const date = new Date(res.header.Date)
        this.setData({
          start: utlis.toDate(date),
          end: utlis.toDate(new Date(date.getTime() + 29 * 24 * 60 * 60 * 1000)),
          trainDate: utlis.toDate(date)
        })
      }
    })
  },
  /* wxml需要的event */
  // 表达提交事件
  query(event) {
    const data = event.detail.value
    const values = Object.values(data)

    if(/.+&.+&.+/.test(values.join('&'))) {
      const urlData = Object.keys(data).map(key => key + "=" + data[key]).join('&')
        // 开启子页面
        wx.navigateTo({
          url: '/pages/home/list?' + urlData,
        })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请选择出发的时间或者目的地'
      })
    }
  },

  // 设置时间组件的时间改变
  setTrainDate(event) {
    this.setData({
      trainDate: event.detail.value
    })
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