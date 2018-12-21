var list = require('../../../commonjs/majordata.js')
var sour = "my";
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
    sour = options.soure;
  },
  choseMajor: function (e) {
    console.log(e);
    wx.removeStorageSync("charpterAllData");
    var majorName = e.currentTarget.dataset.majorname;
    var majorValue = e.currentTarget.dataset.majorvalue;
    wx.setStorageSync('productType', majorValue);
    wx.setStorageSync('productName', majorName);
    if (majorValue) {
      if (sour == 'act') {
        wx.reLaunch({
          url: '../active/active',//路径有误
        })
      } else {
        //跳转到题库页面
        wx.reLaunch({
          //url: '../exam/exam',
          url:'/pages/stiku/stiku',
        })
      }
    } else {
      wx.showModal({
        title: "",
        content: "请选择专业",
        showCancel: false,
        confirmText: "ok"
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //  获取可视区屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        // percent 为当前设备1rpx对应的px值
        var percent = res.windowWidth / 750;
        var right_titleRpxHeight = 60;
        that.setData({
          winHeight: res.windowHeight,
          right_titleHeight: Number(right_titleRpxHeight * percent)
        })
      }
    })
    // 把请求到的 list 中的数据赋值给  listChild1
    var listChild1 = list.List[0];
    // 循环 listChild1 中的每一项
    for (var item in listChild1) {
      // 计算右侧每一个分类的 Height 。
      // listChild1 下的每一个 item 中包含该分类的 title，所以 listChild1[item].length 需要减一 
      // 右侧每一个分类中每一行放两个商品，所以 this.data.right_contentHeight 除二
      // 最后加上 right_titleHeight，此时 height 为右侧一个完整分类的高度
      var height = (listChild1[item].length - 1) * this.data.right_contentHeight / 2 + this.data.right_titleHeight;
      // 把每一个 height 用“：”隔开放入 listHeight 中
      this.data.listHeight += ":" + height;
      this.setData({
        // 把 listChild1 赋值给 list ，供 wxml 中循环使用
        list: listChild1,
        listHeight: this.data.listHeight
      })
    }
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
    console.log("--->major.js function onShareAppMessage()");
    return {
      path: '/pages/login/login-tel/login-tel'
    }
  }
})