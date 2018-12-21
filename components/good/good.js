Component({
  /* 组件的属性列表 */
  properties: {
    rights:{
      type:Number,
      value:0
    },
    duration:{
      type:String,
      value:0
    },
    goodOrBad: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: ''     // 属性初始值（可选），如果未指定则会根据类型选择一个 默认给一个good
    },
    score:{
      type:Number,
      value:0
    },
    bfb: {
      type: Number,
      value: 0
    }
  },

  /* 组件的初始数据 */
  data: {
    status: true
  },
  /* 组件的方法列表 */
  methods: {
    
    _onClose: function () {
      this.setData({
        status: !this.data.status
      })
      this.triggerEvent("onClose", this.properties.qid);
      // if (this.data.status == true) {
      //   this.setData({
      //     status: false
      //   })
      // } else {
      //   this.setData({
      //     status: true
      //   })
      // }
    },
   
  },
})
