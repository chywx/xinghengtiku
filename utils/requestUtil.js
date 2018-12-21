function onShoucangUtil(that, qid, phone, productType) {
  wx.request({
    url: getApp().data.basePath + '/TiKu/subShouCang.do',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      optionInfo: qid,
      username: phone,
      productType: productType
    },
    success: function (data) {
      // console.log(data.data, that.data.threeData);
      var tData = that.data.threeData;
      console.log("收藏前的数量", Object.getOwnPropertyNames(tData).length);
      if (data.data.data == '1') {//1表示收藏了
        tData.favorites.push(qid);
        console.log("push操作,添加收藏了");
      } else if (data.data.data == 2) {//2表示取消收藏
        var ind = tData.favorites.indexOf(qid);
        tData.favorites.splice(ind, 1);
        console.log("splice操作,取消删除了");
      }
      that.setData({
        threeData: tData
      })
    }
  })
}

module.exports = {
  onShoucangUtil: onShoucangUtil
}