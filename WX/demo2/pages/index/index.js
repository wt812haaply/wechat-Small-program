//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    name:null,
    message:null,
    step:null,
    imgsrc:null,
    imgwidth:null
  },
  inputName:function(e){
    //console.log(e.detail.value);
    this.setData({name:encodeURI(e.detail.value)});
    //console.log(this.data.name)
    
  },
  onLoad: function(){
    
  },
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/user?id=123'
    }
  },
  click: function(){
    var that=this;
    wx.request({
      url: 'https://apis.juhe.cn/cook/query?key=32f0e6c2a5501a7458c4578345ca76b8&rn=1&menu='+this.data.name, //仅为示例，并非真实的接口地址
      data: {
        x: '' ,
        y: ''
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        //console.log(res.data.result.data)
        that.setData({message:res.data.result.data})
        that.setData({step:res.data.result.data[0].steps})
        wx.getSystemInfo({
          success: function(res) {
            that.setData({imgwidth:res.windowWidth})
            // console.log(res.windowWidth)
            // console.log(res.windowHeight)
            console.log(that.data.imgwidth)
          }
        })
      }
    })
  }
  

})

