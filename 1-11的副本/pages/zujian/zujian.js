Page({
    openToast: function () {
        wx.showToast({
            title: '已完成',
            icon: 'success',
            duration: 3000
        });
    },
    openLoading: function () {
        wx.showToast({
            title: '1数据加载中',
            icon: 'loading',
            duration: 3000
        });
    },
// });



// tab        var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
//  Page({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
// })

//弹出
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


//dialog

// Page({
    openConfirm: function () {
        wx.showModal({
            title: '弹窗标题',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            confirmText: "主操作",
            cancelText: "辅助操作",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作')
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    openAlert: function () {
        wx.showModal({
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    },
// })

//ActionSheet
// Page({
    open: function(){
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function(res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
// })

//search
// Page({
    // data: {
    //     inputShowed: false,
    //     inputVal: ""
    // },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
})