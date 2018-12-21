var app = getApp();
var phone = null;
var productType = null;
var firstTime = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
  },
  to_mrjs(){
    console.log("每日竞赛");
    wx.navigateTo({
      url: './mrjs/mrjs',
    })
  },
  to_gpkd(){
    console.log("高频考点");
    wx.showLoading({
      title: '正在完善中。。。',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  to_mnks(){
    console.log("模拟考试");
    wx.showLoading({
      title: '正在完善中。。。',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  banMethod(){
    console.log("活动页面");
    wx.showLoading({
      title: '正在完善中。。。',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    firstTime = false;
    console.log("stiku.lonload");
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("productName")
    })
    phone = wx.getStorageSync("phone");
    productType = wx.getStorageSync("productType");
    // app.setVip9Status(phone,productType);
    // app.setUserMessage(phone);//每次都进行操作是不方便，暂时先这么处理。
    // app.setThreeData(phone, productType);
    var that = this;
    if(wx.getStorageSync("charpterAllData")){
        that.setData({
          lists: wx.getStorageSync("charpterAllData")
        });
    }else{
        wx.request({
          url: getApp().data.basePath +'/TiKu/getCharpterName.do',
          method: 'POST',
          data: {
            professional: productType
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
            wx.setStorageSync("charpterAllData", res.data.list);
            console.log(res);
            that.setData({
              lists:res.data.list
            });
          }
        })
    }
    app.set3Method(phone, productType);
  },
//res.currentTarget.dataset
  loadSon:function(res){
    var lists = this.data.lists;
    lists[res.currentTarget.dataset.index].open = !lists[res.currentTarget.dataset.index].open;
    for (var i = 0; i < lists.length; i++) {
      if(res.currentTarget.dataset.index!=i){
        lists[i].open = false;
      }
    }
    this.setData({
      lists:lists
    })
  },

  redirectToMethod:function(e){
    var charpterid = e.currentTarget.dataset.charpterid;
    // wx.redirectTo({
    //   url: '/pages/stiku/practice/practice?charpterid=' + charpterid,
    // })
    wx.navigateTo({
      url: 'zjlx/zjlx?ksid=' + charpterid
    })
  },
  
  // shareFriend:function(){
  //   console.log("分享");
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
    if (firstTime=='false'){
      this.onLoad();
      console.log("stiku.onShow firstTime", firstTime);
    }
    //
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