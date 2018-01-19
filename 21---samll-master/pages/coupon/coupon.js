// pages/coupon/coupon.js
var app = getApp();
Page({
  data: {
    listArr: [],
    ChooseFailureidArr: []
  },
  onLoad: function (options) {
    var that = this;
    var ChooseFailureidArr = [];
    //获取本地下单对象信息
    try {
      var value = wx.getStorageSync('order_data')
      if (value) {
        var tampArr = value.combTampArr;
        console.log()
        for (var i = 0; i < tampArr.length; i++) {
          ChooseFailureidArr.push(tampArr[i].ChooseFailureid)
        }
        that.setData({
          data: value,
          ChooseFailureidArr: ChooseFailureidArr
        })
        console.log(value)
      }
    } catch (e) {
      // Do something when catch error
      console.log("coupon页面的获取本地数据catch")
      console.log(e)
    }
    // 页面初始化 options为页面跳转所带来的参数
    //全局变量存在用户ID就请求服务器获取地址列表信息
    if (app.globalData.userid) {
      wx.showToast({
        title: '获取数据中...',
        icon: 'loading',
        duration: 10000
      });
      wx.request({
        url: app.globalData.serverUrl + 'getAvailableCoupon',
        data: {
          userID: app.globalData.userid,
          ChooseFailureidArr: ChooseFailureidArr
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res)
          if (res.data.error_code == 0) {
            var list = res.data.data.list;
            if (list.length) {
              for (var i = 0; i < list.length; i++) {
                list[i].useEndTime = that.getTime((new Date(parseInt(list[i].useEndTime) * 1000)));
                list[i].money = parseInt(list[i].money);
              }
              that.setData({
                listArr: list
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '没有可使用优惠券',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            }

          } else {
            wx.showModal({
              title: '提示',
              content: res.data.error_msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          wx.hideToast();
        }
      })
    } else {//重新请求服务器获取用户id并刷新页面
      wx.login({
        success: function (res) {
          if (res.code) {
            var code = res.code;
            console.log(code);
            wx.getUserInfo({
              success: function (res) {
                console.log(res);
                var encryptedData = encodeURIComponent(res.encryptedData);//一定要把加密串转成URI编码
                //var encryptedData = res.encryptedData;//一定要把加密串转成URI编码
                var iv = res.iv;
                //请求自己的服务器
                app.login(code, encryptedData, iv, function () {
                  wx.redirectTo({
                    url: '../coupon/coupon'
                  })
                });
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });

      console.log(app.globalData.userid)
    }
  },
  //选择优惠券
  select: function (event) {
    if (this.data.data) {
      this.data.data.couponID = event.target.dataset.id;
      this.data.data.couponName = event.target.dataset.text;
      this.data.data.couponPrice = event.target.dataset.price;
    }

    console.log(this.data.data)
    try {
      wx.setStorageSync('order_data', this.data.data)
    } catch (e) {
      console.log("address页面的保存本地数据catch")
      console.log(e)
    }

    wx.navigateBack({
      delta: 1
    })

  },
  getTime: function (time) {
    console.log(time)
    // var time = this.data.time;
    if (time) {
      var yy = time.getYear() + 1900;
      var MM = time.getMonth() + 1;
      var dd = time.getDate();
      var HH = time.getHours();
      var mm = time.getMinutes();
      var ss = time.getSeconds();

      return yy + "-" + this.bl(MM) + "-" + this.bl(dd) + " " + this.bl(HH) + ":" + this.bl(mm) + ":" + this.bl(ss);
    }
    else {
      time = new Date();
      var yy = time.getYear() + 1900;
      var MM = time.getMonth() + 1;
      var dd = time.getDate();
      var HH = time.getHours();
      var mm = time.getMinutes();
      var ss = time.getSeconds();

      return yy + "-" + this.bl(MM) + "-" + this.bl(dd) + " " + this.bl(HH) + ":" + this.bl(mm) + ":" + this.bl(ss);
    }
  },
  bl: function (s) {
    return s < 10 ? '0' + s : s;
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})