var util = require("../../../utils/util.js");
var productType = ''
var username = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productType: productType,
    userProfilePhone: wx.getStorageSync("userinfo").avatarUrl,
    topTitle:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    productType = wx.getStorageSync("productType");
    username = wx.getStorageSync("phone");
  },

  
  topTitle(){
    this.setData({
      topTitle: !this.data.topTitle
    })
    if (this.data.topTitle){
      wx.setNavigationBarTitle({
        title: '每日竞赛',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '已参赛',
      })
    }
  },
  // toQuestions(){
  //   wx.navigateTo({
  //     url: '../mrylquestions/mrylquestions?testId=testId',
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      // url: 'http://www.xinghengedu.com/testpaper/ZHIYEYISHI.do?username=13121939122',
      url: getApp().data.basePath + '/TiKu/testpaper/' + productType + '.do?username=' + username,
      success: function (data) {
        console.log(data.data);
        that.setData({
          mrjsArr: data.data
        })
      }
    })
    wx.request({
      // url: 'http://www.xinghengedu.com/testpaper/ZHIYEYISHI/over.do?username=13121939122',
      url: getApp().data.basePath + '/TiKu/testpaper/' + productType + '/over.do?username=' + username,
      success: (data) => {
        console.log(data);
        that.setData({
          mrjsOver: data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("mrjs onhide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("mrjs onUnload");
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