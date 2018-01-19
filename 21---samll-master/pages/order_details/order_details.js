var app = getApp();
Page({
  data: {
    info: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log(options)
    var orderid = options.orderid;
    wx.showToast({
      title: '获取数据中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.globalData.serverUrl + 'getOrder',
      data: {
        orderID: orderid,
        userID: app.globalData.userid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res);
        if (res.data.error_code == 0) {
          var info = res.data.data.info;
          if (!info.colorName) {
            info.colorName = '';
          }
          if (!info.couponName) {
            info.couponName = '';
          }
          if (!info.desc) {
            info.desc = '';
          }
          info.orderTime = that.getTime(new Date(parseInt(info.orderTime) * 1000));
          info.addTime = that.getTime(new Date(parseInt(info.addTime) * 1000));
          info.price = parseFloat(info.couponPrice) + parseFloat(info.totalPrice);
          that.setData({
            info: info
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },
  //打电话
  tel: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.target.dataset.phone
    })
  },
  //返修
  backRepair: function (event) {
    var orderid = event.target.dataset.orderid;
    try {
      wx.removeStorageSync('backRepair_data')
    } catch (e) {
      console.log(e)
    }
    wx.navigateTo({
      url: '../back_repair/back_repair?orderid=' + orderid
    })
  },
  //评价
  appraise: function (event) {
    var orderid = event.target.dataset.orderid;
    var masterid = event.target.dataset.masterid;
    wx.navigateTo({
      url: '../appraise/appraise?orderid=' + orderid + '&masterid=' + masterid
    })
  },
  //取消订单
  cancelOrder: function (event) {
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success: function (res) {
        if (res.confirm) {
          var orderid = event.target.dataset.orderid;
          wx.showToast({
            title: '取消订单中...',
            icon: 'loading',
            duration: 10000
          });
          wx.request({
            url: app.globalData.serverUrl + 'cancelOrder',
            data: {
              orderID: orderid,
              userID: app.globalData.userid
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log(res)
              if (res.data.error_code == 0) {
                wx.showModal({
                  title: '提示',
                  content: '取消订单成功',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
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
            },
            fail: function () {
              // fail
            },
            complete: function () {
              wx.hideToast();
            }
          })
        }
      }
    })

  },
  //付款
  pay: function (event) {
    var orderid = event.target.dataset.orderid;
    wx.showToast({
      title: '付款中...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: app.globalData.serverUrl + 'wxPay',
      data: {
        orderID: orderid,
        userID: app.globalData.userid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.error_code == 0) {
          var info = res.data.data.info;
          wx.requestPayment({
            'timeStamp': info.timeStamp,
            'nonceStr': info.nonceStr,
            'package': info.package,
            'signType': info.signType,
            'paySign': info.paySign,
            'success': function (res) {
              wx.showModal({
                title: '提示',
                content: '付款成功',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              console.log(res)
            }
          })
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
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast();
      }
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
  previewImage: function (event) {
    wx.previewImage({
      current: event.target.dataset.url, // 当前显示图片的http链接
      urls: [event.target.dataset.url] // 需要预览的图片http链接列表
    })
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