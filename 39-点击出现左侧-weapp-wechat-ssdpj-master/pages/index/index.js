//index.js

var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    feed: [],
    feed_length: 0,
    maskDisplay: 'none',
        slideHeight: 0,
        slideRight: 0,
        slideWidth: 0,
        screenHeight: 0,
        screenWidth: 0,
        slideDisplay: 'block',
        slideAnimation: {},
        userInfo: {},
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getSystemInfo( {
      success: function( res ) {
        that.setData( {
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth,
          slideHeight: res.windowHeight,
          slideRight: res.windowWidth,
          slideWidth: res.windowWidth * 0.7
        });
      }
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    this.refresh();
  },
     //点击 侧栏展开
  ballClickEvent: function() {
    slideUp.call( this );
  },
  //遮罩点击  侧栏关闭
  slideCloseEvent: function() {
    slideDown.call( this );
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function(){
    var index_api = '';
    util.getData(index_api)
        .then(function(data){
          //this.setData({
          //
          //});
          console.log(data);
        });
  },

  //使用本地 fake 数据实现刷新效果
  refresh: function(){
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }


})
//侧栏展开
function slideUp() {
  var animation = wx.createAnimation( {
    duration: 600
  });
  this.setData( { maskDisplay: 'block' });
  animation.translateX( '100%' ).step();
  this.setData( {
    slideAnimation: animation.export()
  });
}

//侧栏关闭
function slideDown() {
  var animation = wx.createAnimation( {
    duration: 600
  });
  animation.translateX( '-100%' ).step();
  this.setData( {
    slideAnimation: animation.export()
  });
  this.setData( { maskDisplay: 'none' });
}