//index.js
//获取应用实例
Page({
  data:{
    
  },
  ee:function(){
      wx.navigateTo({
        url: 'pages/index-fb/index',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  }
 
})