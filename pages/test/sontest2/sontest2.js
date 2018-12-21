// pages/test/sontest2/sontest2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // startX:0,
    // startY:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  touchstart(e){
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  touchend(e){
    var endX = e.changedTouches[0].clientX;
    var endY = e.changedTouches[0].clientY;
    var angle = this.angle({ X: this.data.startX, Y: this.data.startY }, { X: endX, Y: endY });
    if (Math.abs(angle)>=30){
      return ;
    }
    if (this.data.startX > endX){
      console.log("左滑");
    }else{
      console.log("右滑");
    }
  },
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);//返回角度 /Math.atan()返回数字的反正切值
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