var touchDot = 0;//触摸时的原点
var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理 时间记录
var nth = 0;// 设置活动菜单的index
var nthMax = 5;//活动菜单的最大个数
var tmpFlag = true;// 判断左右华东超出菜单最大值时不再执行滑动事件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drugList:[
      { name: 'CHN', value: '中国' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ],
    menu:[true],
    flag: 0,
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'TUR', value: '法国' },
    ]
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  changeColor1: function () {
    console.log(1);
    var that = this;
    that.setData({
      flag: 1
    });
  },
  changeColor2: function () {
    var that = this;
    that.setData({
      flag: 2
    });
  },
  changeColor3: function () {
    var that = this;
    that.setData({
      flag: 3
    });
  },
  changeColor4: function () {
    var that = this;
    that.setData({
      flag: 4
    });
  },
  changeColor5: function () {
    var that = this;
    that.setData({
      flag: 5
    });
  },






  formSubmit(e) {
    console.log("formSubmit");
    console.log(e.detail.formId);
  },



















  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = this.data.drugList;
    console.log(list);
    list.push({ name: 'ymh', value: '雅马哈' });
    console.log(list);
    console.log(set);
    var arr = [];
    var index = Math.round(Math.random() * 50);
    console.log(index);
    for(var i = 0;i<50;i++){
      arr[i] = i;
    }
    var a = arr.splice(index,1);
    console.log(a);
    console.log(arr);
    var set = new Set();
    while(set.size<4){
      console.log(111);
      set.add(Math.round(Math.random() * 5));
    }
    console.log(set);
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
  
  },














  //   var touchDot = 0;//触摸时的原点
  // var time = 0;//  时间记录，用于滑动时且时间小于1s则执行左右滑动
  // var interval = "";// 记录/清理 时间记录
  // var nth = 0;// 设置活动菜单的index
  // var nthMax = 5;//活动菜单的最大个数
  // var tmpFlag = true;// 判断左右华东超出菜单最大值时不再执行滑动事件


  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动   
    if (touchMove - touchDot <= -40 && time < 10) {
      if (tmpFlag && nth < nthMax) { //每次移动中且滑动时不超过最大值 只执行一次
        var tmp = this.data.menu.map(function (arr, index) {
          console.log("左滑");
          tmpFlag = false;
          if (arr.active) { // 当前的状态更改
            nth = index;
            ++nth;
            arr.active = nth > nthMax ? true : false;
          }
          if (nth == index) { // 下一个的状态更改
            arr.active = true;
            name = arr.value;
          }
          return arr;
        })
        this.getNews(name); // 获取新闻列表
        this.setData({ menu: tmp }); // 更新菜单
      }
    }
    // 向右滑动
    if (touchMove - touchDot >= 40 && time < 10) {
      if (tmpFlag && nth > 0) {
        nth = --nth < 0 ? 0 : nth;
        var tmp = this.data.menu.map(function (arr, index) {
          console.log("右滑");
          tmpFlag = false;
          arr.active = false;
          // 上一个的状态更改
          if (nth == index) {
            arr.active = true;
            name = arr.value;
          }
          return arr;
        })
        this.getNews('name'); // 获取新闻列表
        this.setData({ menu: tmp }); // 更新菜单
      }
    }
    // touchDot = touchMove; //每移动一次把上一次的点作为原点（好像没啥用）
  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
    tmpFlag = true; // 回复滑动事件
  },
})





