Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /* 组件的属性列表 */
  properties: {
  
  },
  data: {
   showStatus:true
  },
  /* 组件的公有方法列表*/
  methods: {
    onCloseRegular: function () {
      if(this.data.showStatus==true){
        this.setData({
          showStatus:false
        })
      }else{
        this.setData({
          showStatus: true
        })
      }     
    }
  },

})