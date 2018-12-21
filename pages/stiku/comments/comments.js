var util = require("../../../utils/util.js");
var pageNo = 1;
var feedid = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'',
    lists: null,
    inputComment:''//评论内容默认为空
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    pageNo = 1;
    //console.log(options.feedid,111);
    feedid = options.feedid;
    // feedid = '5752e905d36ef3b8c77260a7';//方便测试使用，先给一个默认值。
    console.log(feedid);
    wx.request({
      url: getApp().data.basePath + '/TiKu/getComments.do',
      method: 'POST',
      data:{
        feedid:feedid,//'5752e905d36ef3b8c77260a7'
        username:wx.getStorageSync('phone')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data.list);
        var ls = res.data.list;
        ls = that.forMethod(ls);
        that.setData({
          lists: ls
        })
      }
    })
  },

  forMethod:function(ls){
    for (var i = 0; i < ls.length; i++) {
      ls[i].create_time = util.timestampToTime(ls[i].create_time);
      ls[i].creator_id = ls[i].creator_id.substr(0, 3) + "****" + ls[i].creator_id.substr(8, 11);
    }
    return ls;
  },
  // 点赞功能
  onLike:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.lists[index]);
    var likeStatus = that.data.lists[index].is_like==0 ? 1 : 0;
    if(likeStatus == 1){
      that.data.lists[index].like_count = that.data.lists[index].like_count + 1;
    }else{
      that.data.lists[index].like_count = that.data.lists[index].like_count - 1;
    }
    wx.request({
      url: getApp().data.basePath + '/TiKu/clickLike.do',
      method: 'POST',
      data: {
        username: wx.getStorageSync('phone'),
        commentId: that.data.lists[index].id,
        isLike: likeStatus
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if (res.data.success){
          var newLists = that.data.lists;
          newLists[index].is_like = likeStatus;
          that.setData({
            lists : newLists
          })
        }
      }
    })


  },

  // 评论功能
  commentInput:function(e){
    this.setData({
      commentInput:e.detail.value
    })
  },

  uploadingComment:function(){  
    var that = this;
    console.log(that.data.commentInput);
    wx.request({
      url: getApp().data.basePath + '/TiKu/uploadingComment.do',
      method:'POST',
      data:{
        feedId:feedid,
        text: that.data.commentInput,
        username:wx.getStorageSync("phone")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if (res.data.success){
          wx.showToast({
            title: '评论成功！',
          })
          wx.redirectTo({
            url: '/pages/stiku/comments/comments?feedid='+feedid,
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'loading'
          })
        }
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
    console.log("onPullDownRefresh");
    pageNo++;
    console.log(pageNo);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var that = this;
      pageNo++;
      console.log(pageNo);
      that.setData({
          msg:'加载中。。。',
      })
      wx.request({
        url: getApp().data.basePath + '/TiKu/getComments.do',
        method: 'POST',
        data: {
          feedid: feedid,//'5752e905d36ef3b8c77260a7',
          pageNum:pageNo
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data.list);
          var ls = res.data.list;
          if(ls.length!=0){
            ls = that.forMethod(ls);
            that.setData({
              lists: that.data.lists.concat(ls),
              msg:''
            })
          }else{
            pageNo--;
            wx.showToast({
              title: '没有更多数据了',
            });
            that.setData({
              msg: ''
            })
          }
        }
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})