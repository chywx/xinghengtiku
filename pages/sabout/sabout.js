// pages/sabout/sabout.js
Page({
  data: {
    //userProfilePhone:''
  },
  // onShow: function () {
  //   console.log("onshow");
  //   this.setData({
  //     cacheSize: wx.getStorageInfoSync().currentSize + "KB"
  //   })
  // },
  onLoad: function (options) {
    var threeData = wx.getStorageSync("threeData");
    var notesCount = this.attributeCount(threeData.notes);
    this.setData({
      userProfilePhone:wx.getStorageSync("userinfo").avatarUrl,
      isVip9: wx.getStorageSync("isVip9"),
      jcuser: wx.getStorageSync("jcuser"),
      productType: wx.getStorageSync("productName"),
      threeData: threeData,
      notesCount: notesCount,
      cacheSize: wx.getStorageInfoSync().currentSize+"KB"
    })
  },

  doShouCang(){
    wx.navigateTo({
      url: 'shoucang/shoucang?purpose=shoucang'
    })
  },

  doCuoTi(){
    wx.navigateTo({
      url: 'shoucang/shoucang?purpose=cuoti'
    })
  },

  doBiJi(){
    wx.navigateTo({
      url: 'shoucang/shoucang?purpose=biji'
    })
  },


  // 获取两个数组中不重复的元素。
  // 使用filter方法，里面传入一个函数，函数默认三个参数，①当前集合指定的元素②index③arr
  // 跟map方法类似，区别就是删除返回类型为FALSE的。
  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
  },

  clearCache(){
    wx.showLoading({
      title: '清除成功',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
    var cacheKeys = wx.getStorageInfoSync().keys;
    var dontRemoveArr = ['userinfo', 'phone', 'productType','productName'];
    var result = this.getArrDifference(cacheKeys, dontRemoveArr);
    console.log(result);
    result.map(function(argue){
      wx.removeStorageSync(argue);
    });
    this.setData({
      cacheSize:'0KB'
    })
    wx.switchTab({
      url: '/pages/stiku/stiku',
    });
  },
  bindGetUserInfo:function(res){
    console.log(res);
  },
  attributeCount:function(obj){
    var count = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
        count++;
      }
    }
    return count;
  },
  switchProductType(){
    wx.redirectTo({
      url: '../login/login-major/login-major',
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
    console.log("home onshow");
    this.onLoad();
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