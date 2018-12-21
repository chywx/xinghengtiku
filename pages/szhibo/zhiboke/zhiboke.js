// pages/szhibo/szhibo.js
Page({
  data: {
    status:true
  },
  onLoad: function (options) {

  },
  onClose:function(){
    if (this.data.status==true){
      this.setData({status:false})
    }else{
      this.setData({ status: true })
    }
  }
})