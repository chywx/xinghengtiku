var userAnswers = {};
var tjAnswer = [];
var ksid;
var beginTime = new Date();
var username = ''
var productType = ''
var requestUtil = require("../../../utils/requestUtil.js");
Page({
  data: {
    //isExam:true,
    examcurrent: 0,
    showStatus: false,//答题卡样式，默认不点击为灰色
    // beiti: false,//每日一练不需要背题
    // beiti_logo: false,
    chongkao: true,
    tab: [],
    submitAnswer: false,
    backurl: null,
    basePath: getApp().data.basePath,
    //chy
    reqAnswer: [1],//后台请求到的答案，默认为空
    beitistatus: true,//是否选择背题模式。
    examData: [],//请求的问题集合
    answer: null,
    examDataDetailObj: null,
    shoucang: false,//shoucang 这个值需要从数据库中进行查询。
    threeData: null,
    // showJiaojuan:true,

    secondFormat:'00:00',
    second:20*60,//20分钟
    showShiJian:true,
    isZjlx:false,
    isAlreadySubmit:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = wx.getStorageSync('phone');
    productType = wx.getStorageSync("productType");
    console.log("onload携带的参数:", options.isExam ? 'true':'false');
    console.log("showParse:", !options.isExam ? 'true' : 'false');
    var that = this;
    that.setData({//说白了，完全可以共用一个参数。已经这样了。
      isExam: options.isExam ? true : false,
      showShiJian: options.isExam ? true : false,
      showJiaojuan: options.isExam ? true : false,
      showParse: !options.isExam ? true : false,
      threeData: wx.getStorageSync("threeData"),
      shoucang: true
    })
    ksid = options.testId;
    wx.request({
      url: getApp().data.basePath + '/TiKu/testpaper/' + productType+'/' + ksid + '.do?username=' + username,
      success: (data) => {
        console.log(data.data);
        var temp = data.data.list;
        var sum = temp.length;
        if (options.isExam){
          for (var i = 0; i < sum; i++) {
            temp[i].examId = i;//目前是为了中和杨云的展示。
            temp[i].index = i;//点击背题的时候再进行答案显示。
            temp[i].showParse = false;//展示解析，默认为FALSE。
          }
        }else{
          for (var i = 0; i < sum; i++) {
            temp[i].examId = i;//目前是为了中和杨云的展示。
            temp[i].index = i;//点击背题的时候再进行答案显示。
            temp[i].showParse = true;//展示解析，默认为FALSE。
          }
        }
        that.setData({
          examData: temp,
          examSum: sum
        })
        that.countdown(that);
      }
    })
    //当前页面的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  onShoucang: function (e) {
    var that = this;
    var qid = e.currentTarget.dataset.qid;
    requestUtil.onShoucangUtil(that, qid, wx.getStorageSync('phone'), wx.getStorageSync('productType'));
  },

  _delEvent: function (res) {
    var tdata = this.data.threeData;
    console.log('删除的回调', res.detail, tdata.notes[res.detail]);
    console.log(delete (tdata.notes[res.detail]));
    this.setData({
      threeData: tdata
    })
  },
  _confirmEvent: function (res) {
    var tdata = this.data.threeData;
    console.log('笔记新增的回调', res.detail.qid, res.detail.noteInput, tdata.notes[res.detail.qid]);
    console.log(tdata.notes[res.detail.qid] = { 'Content': res.detail.noteInput });
    this.setData({
      threeData: tdata
    })
  },
  // 关闭弹窗回调的方法。
  _onClose() {
    this.setData({
      isAlreadySubmit:true
    })
    console.log("_onClose");
    wx.navigateBack({
      delta: 1
    })
  },


  /**
   * 单选题选择答案
   */
  onRadioChange: function (e) {
    console.log('每日一练 onRadioChange()');
    var questionId = e.currentTarget.id;// 题目id
    var value = e.detail.value;// 用户选的答案
    var obj = this.createAnswerObj(e,value)
    tjAnswer[this.data.examcurrent] = obj;//提交的answer参数。
    userAnswers[questionId] = value;// 存入map
    console.log("tjAnswer:",tjAnswer);
     var mine = "examData[" + this.data.examcurrent + "].yzt";
    console.log("data:",this.data.examcurrent,this.data.examData.length-1);
    if (this.data.examcurrent == this.data.examData.length - 1) {
      this.setData({
        answer: userAnswers,
        [mine]: '1',
        examcurrent: this.data.examcurrent,//+1表示页面跳到下一页 由于是做题，可以加1
      })
      wx.showToast({
        "title": "这已经是最后一题了！",
        "icon": "none"
      })
    }
    if (this.data.examcurrent < this.data.examData.length - 1){
      this.setData({
        answer: userAnswers,
        [mine]: '1',
        examcurrent: this.data.examcurrent + 1,//+1表示页面跳到下一页 由于是做题，可以加1
      })
    }
   },

  createAnswerObj(e,value){
    var qid = e.currentTarget.dataset.qid;// 题目id
    var qbid = e.currentTarget.dataset.qbid;// 题目bid
    var obj = {
      'questionId' : qid,
      'questionBId' : qbid,
      'ansow' : value,
      'kstype':3
    };
    console.log(obj);
    return obj;
  },



//提交答案
  formSubmit(){
    console.log('交卷 exam-detail.js function formSubmit()');
    var that = this;
    //当用户提交之后，这个页面并没有关闭，因为使用的是back跳转的。所以需要设置为TRUE，即使倒计时小于0秒也不允许提交。
    if(that.data.isAlreadySubmit){
      return;
    }
    that.setData({
      submitAnswer: true
    });
    wx.showModal({
      title: '提示',
      content: '确定交卷？',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('确定交卷');
          that.saveAnswers();
        } else if (res.cancel) {
          console.log('取消交卷');
        }
      }
    })
  },
  saveAnswers(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    // var productType = wx.getStorageSync('productType');
    var endTime = new Date();// 交卷时间
    wx.request({
      url: getApp().data.basePath + '/TiKu/testpaper/' + productType+'/'+ksid+'.do',
      // url: getApp().data.basePath + '/TiKu/testpaper/' + productType + '/14745349633.do',
      method: 'POST',
      data: {
        username: username,
        answers: JSON.stringify(tjAnswer),
        beginTime: beginTime,
        endTime: endTime,
        duration: parseInt((endTime.getTime() - beginTime.getTime())/1000)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log("success res:",res.data);
        that.setData({
          duration: res.data.duration,
          rights: res.data.rights,
          goodOrBad: res.data.rights > 1 ? 'good':'bad',
          bfb: Math.round((res.data.rights / that.data.examSum) * 100)
        })
        console.log("right",that.data.rights);
        wx.hideLoading();
      }
    })
  },
  // saveCountdown2cache: function () {
  //   console.log('saveCountdown2cache()');
  //   var flag = this.data.submitAnswer;
  //   if (!flag) {
  //     wx.setStorageSync('kssc' + ksid, this.data.kssc);
  //   }
  // },

//时间处理
dateformat(second) {
  var min = Math.floor(second / 60);
  var sec = Math.floor(second % 60);
  return min + ":" + sec;
},
countdown(that){
  var v = that.data.second;
    if (v <= 0) {
      that.setData({
        second: 0,
        secondFormat: '00:00'
      });
      that.setData({
        submitAnswer: true
      });
      that.formSubmit();
    } else {
      setTimeout(function () {
        that.setData({
          second: v - 1,
          secondFormat: that.dateformat(v - 1)
        });
        that.countdown(that);
      }, 1000)
    }
},

// 点击下一题按钮的方法
onTabNext: function (e) {
  if (this.data.examcurrent < this.data.examData.length - 1) {
    this.setData({
      examcurrent: this.data.examcurrent + 1,
    })
  } else {
    wx.showToast({
      "title": "这已经是最后一题了！",
      "icon": "none"
    })
  }
},
// 点击上一题按钮的方法
onTabBefore: function (e) {
  if (this.data.examcurrent > 0) {
    this.setData({
      examcurrent: this.data.examcurrent - 1,
    })
  } else {
    wx.showToast({
      "title": "这是第一题！",
      "icon": "none"
    })
  }
},
//左右滑动事件处理
touchstart(e) {
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY
  })
},
touchend(e) {
  var endX = e.changedTouches[0].clientX;
  var endY = e.changedTouches[0].clientY;
  var angle = this.angle({ X: this.data.startX, Y: this.data.startY }, { X: endX, Y: endY });
  if (Math.abs(angle) >= 30) {
    return;
  }
  if ((this.data.startX - endX) > 60) {
    console.log("左滑"); this.onTabNext();
    return;
  }
  if ((endX - this.data.startX) > 60) {
    console.log("右滑"); this.onTabBefore();
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
    console.log("mrylquestion onUnload");
    // 为确保用户点进来又出去，时间到了也会提交。所以也设置为TRUE，反正下一次进来又会初始化。
    this.setData({
      isAlreadySubmit: true
    })
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
})



