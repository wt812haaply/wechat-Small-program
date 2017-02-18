// var wxCharts = require('dist/wxcharts.js')

var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
var inputinfo = ""; 

var timer;  
var inputinfo = "";  
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
    animationData:"",  
    showModalStatus:false ,

    motto: 'Hello World',
    userInfo: {},
    showTipTxt: '',
    tipHidden: true,

     // 定义标题的数组
    titles: ["Yellow", "Orange", "Green", "Blue", "Purple"],
    // 定义选中标题的初始值0
    selectedTitle: "0",
    inputShowed: false,
        inputVal: "",
    
    //tabs action
    tabs: ["选项一", "选项二", "选项三"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0
  },

  //tabs End



//checkbox radio Action
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
//checkbox radio End

//tabs Action
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





//swiper 轮播 Action
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
  },
//swiper 轮播 End


//searchbar Action
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
//searchbar End







//点击弹出 Aciton
  onLoad: function () {  
  },  
  showModal: function () {  
    // 显示遮罩层  
    var animation = wx.createAnimation({  
      duration: 200,  
      timingFunction: "linear",  
      delay: 0  
    })  
    this.animation = animation  
    animation.translateY(200).step()  
    this.setData({  
      animationData: animation.export(),  
      showModalStatus: true  
    })  
    setTimeout(function () {  
      animation.translateY(0).step()  
      this.setData({  
        animationData: animation.export()  
      })  
    }.bind(this), 200)  
    console.log("准备执行");  
     timer = setTimeout(function () {  
        if(this.data.showModalStatus){  
          this.hideModal();  
          console.log("是否执行");  
      }  
    }.bind(this), 3000)  
  },  
  clickbtna:function(){  
    if(this.data.showModalStatus){  
      this.hideModal();  
    }else{  
      this.showModal();  
    }  
  },  
  hideModal: function () {  
    if(timer != null){  
      clearTimeout(timer);  
      timer = null;  
    }  
    // 隐藏遮罩层  
    var animation = wx.createAnimation({  
      duration: 200,  
      timingFunction: "linear",  
      delay: 0  
    })  
    this.animation = animation  
    animation.translateY(200).step()  
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
//点击弹出 End


//对话框 Aciton
onLoad: function () {  
  },  
  showModal: function () {  
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
      showModalStatus: true  
    })  
    setTimeout(function () {  
      animation.translateY(0).step()  
      this.setData({  
        animationData: animation.export()  
      })  
    }.bind(this), 200)  
  },  
  clickbtnb:function(){  
    if(this.data.showModalStatus){  
      this.hideModal();  
    }else{  
      this.showModal();  
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
  click_cancel:function(){  
    console.log("点击取消");  
     this.hideModal();  
  },  
  click_ok:function(){  
    console.log("点击了确定===，输入的信息为为==",inputinfo);  
      this.hideModal();  
  },  
  input_content:function(e){  
    console.log(e);  
    inputinfo = e.detail.value;   
  },
  //对话框 End  

//share Action
  onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/page/user?id=123'
    }
  },
  //share End
 bindFocus:function(){
        wx.navigateTo({
        url: './search/search'
      })
    },

})


