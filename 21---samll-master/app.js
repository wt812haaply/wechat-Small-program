//app.js
App({
  onLaunch: function () { //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          console.log(code);
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              console.log(JSON.parse(res.rawData))
              that.globalData.userInfo = JSON.parse(res.rawData);
              var encryptedData = encodeURIComponent(res.encryptedData);//一定要把加密串转成URI编码
              //var encryptedData = res.encryptedData;//一定要把加密串转成URI编码
              var iv = res.iv;
              //请求自己的服务器
              that.login(code, encryptedData, iv);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        console.log(res)
      },fail:function(res){
        console.log(res)
      },complete:function(res){
        console.log(res)
      }
    });
  },
  onShow: function () { //当小程序启动，或从后台进入前台显示，会触发 onShow

  },
  onHide: function () { //当小程序从前台进入后台，会触发 onHide

  },
  onError: function (msg) { //当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    console.log("appError:" + msg)
  },
  globalData: { //定义全局对象
    userInfo:null,
    userid: null,
    serverUrl: 'https://small.azooo.com/api/'
  },
  login: function (code, encryptedData, iv,callback) {
    var that = this;
    // console.log('code=' + code);
    // console.log('encryptedData=' + encryptedData);
    // console.log('iv=' + iv);
    //创建一个dialog
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    //请求服务器获取用户id
    wx.request({
      url: this.globalData.serverUrl + 'login',
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        var data = JSON.parse(res.data.trim());
        // console.log(data)
        if (data.error_code == 0) { //成功
          var azooo_userID = data.data.azooo_userID;
          that.globalData.userid = azooo_userID;
          if(callback){
            callback()
          }
        } else {
          wx.showModal({
            title: '提示',
            content: data.error_msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      },
      fail: function () {
        // fail
        // wx.hideToast();
      },
      complete: function () {
        wx.hideToast();
      }
    })
  }
})