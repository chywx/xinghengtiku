function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

function shareUrl(path) {
  console.log("shareUrl(path)");
  var url = 'pages/personal/login-tel/login-tel';

  // 分享标记有值，说明是销售，就给转发url加上分享源，也就是这个销售的手机号
  var shareFlag = wx.getStorageSync('shareFlag');
  if (shareFlag) {
    // 取这个销售的帐号
    var username = wx.getStorageSync('username');
    if (username) {
      url += '?shareSrc=' + username;
    }
  }
  return url;
}

module.exports = {
  formatTime: formatTime,
  shareUrl: shareUrl,
  timestampToTime: timestampToTime
}
