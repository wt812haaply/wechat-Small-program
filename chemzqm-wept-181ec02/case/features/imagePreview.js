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
  }
})
