//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },



// var flag = 0

// Page({

  onLoad: function () {
  },
  showModal: function () {
    //获取时间
    var d = new Date();
    var year = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var now = year + " " + hour;
    var time1 = year + " " + "12:00:00";
    var time2 = year + " " + "18:00:00";
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
    })
    //比较现在时间和设定时间，设置是否可点击状态
    if (now < time1) {                              //两个都可点击
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    }
    else if (now < time2) {                          //下午可点击
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          appointment_button1: "class3"
        })
      }.bind(this), 200)
    }
    else {                                            //都不可点击
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          appointment_button1: "class3",
          appointment_button2: "class3"
        })
      }.bind(this), 200)
    }
  },

  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

// })


//scanCode
// Page({
  data:{
  },
  onLoad: function(options){
  },
  scancode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
// })

})
