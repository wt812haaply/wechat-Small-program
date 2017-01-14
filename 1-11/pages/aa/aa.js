Page({
  data:{
  },
  onLoad: function(options){
  },
  previewImage: function () {
    wx.previewImage({
      current: 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', // 当前显示图片的http链接
      urls: ['http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg'] // 需要预览的图片http链接列表
    })
  },
// })



//Modal

// Page({
  data:{
  },
  onLoad: function(options){
  },
  showModal: function () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
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
  },


// })

// Page({
  data: {
    background: ['green', 'red', 'yellow', 'pink'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
// })


// Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
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
// });

// var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

// Page({
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

// Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        date: '2016-09-01',
        time: '12:01'
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    }
});






