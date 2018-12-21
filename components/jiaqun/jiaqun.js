Component({
  /* 组件的属性列表 */
  properties: {

  },

  /* 组件的初始数据 */
  data: {
    status: true
  },
  /* 组件的方法列表 */
  methods: {
    onClose: function () {
      if (this.data.status == true) {
        this.setData({
          status: false
        })
      } else {
        this.setData({
          status: true
        })
      }
    }
  }
})
