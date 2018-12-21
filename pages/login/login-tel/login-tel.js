// pages/login/login-tel/login-tel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    //msg:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone = wx.getStorageSync("phone");
    if(phone){
      wx.reLaunch({
        url: '/pages/stiku/stiku',
      })
    }
  },
  // 相当于监听按下的操作
  loginPhone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
    //验证手机号是否符合，错误弹出来提示,兴许是市场部人员的用户名，所以不能再前端做验证操作。需要提交到后台
    //进行后台发送验证码操作
  bindButtonStep:function(){
    var that = this;
    wx.request({
      url: getApp().data.basePath + '/getValidateCode.do',
      method: 'POST',
      data: {
        phone: that.data.phone,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.success) {
          // 如果是销售就在缓存中存上shareFlag为true;
          var tel = that.data.phone;
          if (res.data.shareFlag) {
            wx.setStorageSync('shareFlag', true);
            wx.setStorageSync('phone', tel);
            tel = res.data.phone;
          } else {
            wx.setStorageSync('shareFlag', false);
          }
          //如果成功
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            success: function () {
              wx.navigateTo({
                  url: '../login-yzm/login-yzm?phone=' + tel
                })
              // 延迟1秒，等提示消息显示完毕再跳转页面    延迟鸡毛啊
              // setTimeout(function () {
              //   wx.navigateTo({
              //     url: '../login-yzm/login-yzm?phone=' + tel
              //   })
              // }, 1000)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: function (res) {
        console.log('获取验证码请求失败，errMsg：' + res.errMsg);
      }
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