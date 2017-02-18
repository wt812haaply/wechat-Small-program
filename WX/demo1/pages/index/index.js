// var wxCharts = require('dist/wxcharts.js')
Page({

  data: {

    checkboxItems: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'}
    ],
    radioItems: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'}
    ],
    hidden: false,

     // 定义标题的数组
    titles: ["Yellow", "Orange", "Green", "Blue", "Purple"],
    // 定义选中标题的初始值0
    selectedTitle: "0",
    
    //tabs action
    tabs: ["选项一", "选项二", "选项三"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0
  },
  //tabs End

  checkboxChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i ++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems['+i+'].checked'] = true
      } else {
        changed['checkboxItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },
  radioChange: function(e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i ++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems['+i+'].checked'] = true
      } else {
        changed['radioItems['+i+'].checked'] = false
      }
    }
    this.setData(changed)
  },


//tabs action
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
//tabs End






  // 定义点击标题的事件处理函数，将选中标题的id赋值给selectedTitle
  bindtap: function (e) {
    console.log(e)
    this.setData({
      selectedTitle: e.currentTarget.id
    });
  },
  //定义滑块改变的事件处理函数，将current赋值给selectedTitle
  bindChange: function (e) {
    this.setData({
      selectedTitle: e.detail.current
    })
  },
  onReady: function () {
    // 页面渲染完成
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          swiperHeight: (res.windowHeight - 37)
        });
      }
    })
  }
})


