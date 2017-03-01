// pages/search/search.js


Page({
  // 表单事件
  formSubmit:function(e){
     wx.redirectTo({
      url: "../searchlist/searchlist?word="+this.data.inputValue
    })
  }
})
