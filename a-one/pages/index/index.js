//index.js
//获取应用实例

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


  //previewImage
  onLoad: function(options){
  },
  previewImage: function () {
    wx.previewImage({
      current: 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', // 当前显示图片的http链接
      urls: ['http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg'] // 需要预览的图片http链接列表
    })
  },


//此为搜索相关的函数
    inputfocus:function(e){
      console.log(e);
      wx.navigateTo({
      url: "../search/search"
      })
    },


})