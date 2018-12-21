// app.json 注释
Page({

// {
//     "pagePath": "pages/svideo/svideo",
//     "iconPath": "images/tabbar/视频.png",
//     "selectedIconPath": "images/tabbar/视频2.png",
//     "text": "视频"
//   },

// ,{
      //   "pagePath": "pages/test/test",
      //   "iconPath": "images/tabbar/我的.png",
      //   "selectedIconPath": "images/tabbar/我的2.png",
      //   "text": "测试"
      // }

  //      {
  //   "pagePath": "pages/szhibo/szhibo",
  //   "iconPath": "images/tabbar/直播.png",
  //   "selectedIconPath": "images/tabbar/直播2.png",
  //   "text": "直播"
  // },


  data: {
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dialog = this.selectComponent("#dialogs");
    console.log(this.dialog);
  },
  aa(){
    // wx.
  },
  showDialog() {
    this.dialog.showDialog();
  },
  //删除事件
  _delEvent() {
    console.log('你点击了删除');
    this.dialog.hideDialog();
  },
  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent(haha) {
    console.log('你点击了确定',haha.detail.aaa,haha.detail.bbb);
    this.dialog.hideDialog();
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