Page({
  data: {
    phone: '',
    yzm: ''
  },
  onLoad: function (options) {
    //跳转页面进行phone赋值操作
    this.setData({
      phone: options.phone
    })
  },
  // 输入验证码操作
  loginYzm:function(e){
    this.setData({
      yzm: e.detail.value
    })
  },
  // 登陆操作
  onButtonZhuce: function (e) {

    // 登陆在这块进行单独的操作，，并不在app.js里面
    console.log("在login-yzm.js里面调用了wx.login方法");
    wx.login({
      success(res){
        if(res.code){
          console.log("code码：",res.code);
        }
      }
    })




    //进行授权操作。
    wx.setStorageSync("userinfo", e.detail.userInfo);
    var that = this;
    wx.request({
      url: getApp().data.basePath + '/validate.do',
      method: 'POST',
      data: {
        phone: this.data.phone,
        validateCode: this.data.yzm
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.data == null) {// 用户信息为null,表示没有验证失败
          wx.showToast({
            title: res.data.msg,// 验证失败提示信息
            icon: 'none'
          })  
        } else {// 表示验证通过
          wx.setStorageSync('phone', that.data.phone);
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000,
            success: function (e) {
              // var productType = wx.getStorageSync('productType');
              var productType = res.data.data.productType;
              getApp().globalData.scence = 0;
              if (productType == null || productType == '') {// 缓存中专业为空，跳转到选专业页面
                wx.navigateTo({
                  url: '../login-major/login-major',
                })
              } else {// 否则跳转到章节练习首页
                wx.setStorageSync('productType', productType);
                wx.setStorageSync('productName', res.data.data.productName);
                wx.switchTab({
                  url: '../../stiku/stiku',
                })
              }
            }
          })
        }
      }
    })
  },
  // 重新获取验证码操作
  onResend: function () {

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