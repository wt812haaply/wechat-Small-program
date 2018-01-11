Page({
  data: {

  },

  // 展开介绍
  showDesc: function() {
    this.setData({
      desc: true
    })
  },
  // 关闭介绍
  hideDesc: function() {
    this.setData({
      desc: false
    })
  },

})