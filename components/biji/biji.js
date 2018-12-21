Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '弹窗内容'
    },
    // 弹窗取消按钮文字
    delText: {
      type: String,
      value: '删除'
    },
    // 弹窗取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: '确定'
    },

    // chy
    noteText:{
      type:String,
      value:''
    },
    qid:{
      type:String,
      value:'abc'
    }
  },
  data: {
    // 弹窗显示控制
    isShow: false,
    noteInput: null
  },

  methods: {
    // 陈海洋
    showDialogNote() {
      this.setData({
        isShow: true,
        noteInput: this.properties.noteText
      })
    },
    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow,
      })
    },
// input输入事件
    noteInput(e) {
      this.setData({
        noteInput: e.detail.value
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _delEvent() {
      wx.request({
        url: getApp().data.basePath + '/TiKu/delNoteForUser.do',
        data: {
          username: wx.getStorageSync("phone"),
          productType: wx.getStorageSync("productType"),
          questionId: this.properties.qid
        },
        success: function (res) {
          console.log(res.data);
        }
      })
      //触发取消回调
      this.triggerEvent("delEvent", this.properties.qid);
      this.hideDialog();
      
    },
    _cancelEvent() {
      this.hideDialog();
      //触发取消回调
      //this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      wx.request({
        url: getApp().data.basePath + '/TiKu/saveOrUpdateNoteForUser.do',
        data:{
          username:wx.getStorageSync("phone"),
          productType:wx.getStorageSync("productType"),
          questionId:this.properties.qid,
          content: this.data.noteInput
        },
        success:function(res){
          console.log(res.data);
        }
      })
      //触发成功回调
      this.triggerEvent("confirmEvent", { 'qid': this.properties.qid, 'noteInput':this.data.noteInput});
      this.hideDialog();
    }
  }
}) 