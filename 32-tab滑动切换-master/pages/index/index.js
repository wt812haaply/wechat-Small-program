//index.js
var root = getApp()
Page({
  // data
  data: {
    timeLine: root.globalData.timeline.data
  },
  // lifecycle
  onLoad () {
    
  },
  // methods
  touchEntry (e) {
    wx.navigateTo({
      url: '../details/details?index=' + e.currentTarget.dataset.index
    })
  },
  contentLimit (text) {
    return text.substr(50)
  }
})
