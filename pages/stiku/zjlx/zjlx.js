// var util = require("../../../utils/util.js");
var requestUtil = require("../../../utils/requestUtil.js");
var answers = {};
var ksid = '';
var phone = '';
var productType = null;
var duoValue = "";

Page({
  data: {
    isExam:false,
    examcurrent: 0,
    showStatus: false,
    //showJiaojuan: true,
    beiti:true,
    beiti_logo:false,
    chongkao: true,
    tab: [],
    submitAnswer: false,
    //kssc: 0,
    backurl: null,
    // ksscFormat: '00:00',
    basePath: getApp().data.basePath,
    //chy
    // reqAnswer:[1],//后台请求到的答案，默认为空
    beitistatus:true,//是否选择背题模式。
    examData:[],//请求的问题集合
    answer : null,
    examDataDetailObj:null,
    shoucang:false,//shoucang 这个值需要从数据库中进行查询。
    threeData:null,
    isZjlx:true
  },

  

  onLoad: function (option) {
   //对于章节练习而言，ksid考试id就是章节id .初始化数据，章节id，专业，手机号码
    ksid = option.ksid;
    if(wx.getStorageSync("ksid_"+ksid)){
      wx.removeStorageSync("ksid_" + ksid);
    }
    productType = wx.getStorageSync('productType');
    phone = wx.getStorageSync('phone');
    var that = this;
    that.setData({
      threeData:wx.getStorageSync("threeData"),
      shoucang:true
    })
    //如果本地缓存没有数据，就进行查询操作。
    if (wx.getStorageSync("examDataDetail_" + ksid)){
      that.setData({
        examDataDetailObj: wx.getStorageSync("examDataDetail_" +ksid),
      })
    }else{
      that.getExamDataDetailMethod(that,ksid);
    }
    wx.showToast({
      title: '正在获取试题',
      icon: 'loading',
      duration: 1000
    })
    that.setData({ backurl: option.backurl ? option.backurl : null });
    var temp;
    wx.request({
      url: getApp().data.basePath + '/TiKu/getQuestionByCharpterid.do',
      method: 'POST',
      data: {
        phone: phone,//13121939122,//wx.getStorageSync('phone'),
        kstype:1,//1 2 
        charpterId: ksid,
        productType: productType,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var temp = res.data.data;
        console.log(temp);
        if (temp == null || temp.length == 0) {
          wx.showToast({
            title: '没有试题',
            icon: 'none'
          })
        }else{
          // var reqAnswer = that.data.reqAnswer;
          var sum = temp.length;
          for(var i = 0;i<sum;i++){
            temp[i].examId = i;//目前是为了中和杨云的展示。
            temp[i].index = i;//点击背题的时候再进行答案显示。
            temp[i].showParse = false;//展示解析，默认为FALSE。
          }
          that.setData({
            examData: temp,
            examSum: sum
          })
        }
        wx.hideToast();
      }
    }),
    //当前页面的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    this.setData({
      listId: ksid
    })
  },//onload结束

  getExamDataDetailMethod: function (that, ksid) {
    wx.request({
      url: getApp().data.basePath + '/TiKu/charpter/' + ksid + '.do',
      data: {
        username: phone,
        productType: productType,
      },
      success: function (data) {
        var examDataDetailMap = {};
        var returnDataArr = data.data.list;
        for (var i in returnDataArr) {
          examDataDetailMap[returnDataArr[i].questionId] = returnDataArr[i];
        }
        console.log(examDataDetailMap);
        wx.setStorageSync("examDataDetail_" + ksid, examDataDetailMap);
        that.setData({
          examDataDetailObj: examDataDetailMap
        })
      }
    })
  },

  _delEvent:function(res){
    var tdata = this.data.threeData;
    console.log('删除的回调', res.detail, tdata.notes[res.detail]);
    console.log(delete (tdata.notes[res.detail]));
    this.setData({
      threeData: tdata
    })
  },
  _confirmEvent:function(res){
    var tdata = this.data.threeData;
    console.log('笔记新增的回调', res.detail.qid, res.detail.noteInput,tdata.notes[res.detail.qid]);
    console.log(tdata.notes[res.detail.qid]={'Content':res.detail.noteInput});
    this.setData({
      threeData: tdata
    })
  },
  


  onBeiti:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.examcurrent);
    if (e.currentTarget.dataset.beiticonfirm){
      wx.showModal({
        title: '提示',
        content: '开启背题模式后，直接显示全部答案',
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            that.setData({
              beiti_logo: !that.data.beiti_logo,
              beitistatus: !that.data.beitistatus,
              showParse: true
            })
          } else if (res.cancel) {
            return;
          }
        }
      }) 
    }else{
      that.setData({
        beiti_logo: !that.data.beiti_logo,
        beitistatus: !that.data.beitistatus,
        showParse: false
      })
    }
  },
  onShoucang:function(e){
    var that = this;
    var qid = e.currentTarget.dataset.qid;
    requestUtil.onShoucangUtil(that,qid,phone,productType);
  },

  // 可以使用navigator组件。
  onComments:function(e){
    console.log(e.currentTarget.dataset.feedid);
    wx.navigateTo({
      url: '/pages/stiku/comments/comments?feedid=' + e.currentTarget.dataset.feedid,
    })
  },

  onShareAppMessage: function (options) {

  },
  onHide: function () {
    console.log("exam-detail.js function onHide()");
  },
  onUnload: function () {
    console.log("exam-detail.js function onUnload()");
  },

  // 显示隐藏答题卡
  onDatika: function (e) {
    var showStatus = this.data.showStatus;
    if (showStatus) {
      showStatus = false;
      this.setData({
        showStatus: showStatus
      })
    } else {
      showStatus = true;
      this.setData({
        showStatus: showStatus
      })
    }
  },
  //跳转到答题卡上对应的题目
  onTabNum: function (e) {
    var num = e.currentTarget.dataset.num;
    this.setData({
      examcurrent: num - 1,
      qIndex: num - 1,
      showStatus: false
    })
  },

  checkboxSub(e){
    var showParse = "examData[" + this.data.examcurrent + "].showParse";
    this.setData({
      [showParse] : true,
    })
    // console.log("checkboxSub参数：", ksid, productType, e.currentTarget.dataset.testid, 1, phone, duoValue, e.currentTarget.dataset.rightanswer, e.currentTarget.dataset.qid);
    this.subCharpterAnswer(ksid, productType, e.currentTarget.dataset.testid, 1, phone, duoValue);
    this.subWrongSetForUser(e.currentTarget.dataset.qid, productType, phone, duoValue, e.currentTarget.dataset.rightanswer);
  },

  /**
   * 多选题选择答案
   */
  onCheckboxChange: function (e) {
    console.log(e);
    var questionId = e.currentTarget.id;// 题目id
    var value = e.detail.value.sort();// 用户选的答案
    answers[questionId] = value.join('');// 存入map
    duoValue = value.join('');//给全局多选题赋值，用于提交答案操作。
    wx.setStorageSync('ksid_' + ksid, answers);// 存入缓存内
    var index = e.currentTarget.dataset.index;
    var showParse = "examData[" + this.data.examcurrent + "].showParse";
    if (this.data.examcurrent < this.data.examData.length - 1) {
      var mine = "examData[" + this.data.examcurrent + "].yzt";
      this.setData({
        answer: answers,
        [mine]: '1',
        examcurrent: this.data.examcurrent,
        //[showParse]: true,
      })
    } else {
      wx.showToast({
        "title": "这已经是最后一题了！",
        "icon": "none"
      })
    }
  },

  /**
   * 单选题选择答案
   */
  onRadioChange: function (e) {
    console.log("onRadioChange",e);
    console.log('exam-detail.js function onRadioChange()');
    var questionId = e.currentTarget.id;// 题目id
    var value = e.detail.value;// 用户选的答案
    answers[questionId] = value;// 存入map
    wx.setStorageSync('ksid_' + ksid, answers);// 存入缓存内
    if (this.data.examcurrent < this.data.examData.length - 1) {
      var mine = "examData[" + this.data.examcurrent + "].yzt";
      var showParse = "examData["+this.data.examcurrent+"].showParse";
      this.setData({
        answer: answers,
        [mine]: '1',
        examcurrent: this.data.examcurrent,//+1表示页面跳到下一页
        [showParse]:true,
      })
    } else {
      wx.showToast({
        "title": "这已经是最后一题了！",
        "icon": "none"
      })
    }
    // 提交选项。e.detail.value表示我的答案
    console.log("参数：",ksid, productType, e.currentTarget.dataset.testid, 1, phone, e.detail.value, e.currentTarget.dataset.rightanswer,e.currentTarget.dataset.qid);
    // String charpterId,String productType,String testId,String ksType,String dn,String username
    this.subCharpterAnswer(ksid, productType, e.currentTarget.dataset.testid, 1, phone, e.detail.value);
    // String questionID,String productType,String username,String myAnswer,String rightAnswer
    this.subWrongSetForUser(e.currentTarget.dataset.qid, productType, phone, e.detail.value, e.currentTarget.dataset.rightanswer);
  },

  // chy 提交单个答案到answerforuser表中
  subCharpterAnswer:function(aa,bb,cc,dd,ee,ff){
    wx.request({
      url: getApp().data.basePath + '/TiKu/subCharpterAnswer.do',
      method: 'POST',
      data: {
        charpterId: aa,
        productType: bb,
        testId: cc,
        ksType: dd,//1 2 ，目前章节练习不涉及考试模式，所以传1就行了
        username: ee,//13121939122,//wx.getStorageSync('phone'),
        dn: ff,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('提交单个答案到answerforuser表中',res);
      }
    })
  },
  // chy 提交单个答案到wrongsetforuser表中
  subWrongSetForUser: function (aa, bb, cc, dd, ee) {
    wx.request({
      url: getApp().data.basePath + '/TiKu/subWrongSetForUser.do',
      method: 'POST',
      data: {
        questionID:aa,
        productType:bb,
        username:cc,
        myAnswer:dd,
        rightAnswer:ee
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('提交单个答案到wrongsetforuser表中',res);
      }
    })
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


  imgYu: function (event) {
    //getApp().globalData.scence = 1;
    var src = event.currentTarget.dataset.src;//获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src]
    })
  },

})